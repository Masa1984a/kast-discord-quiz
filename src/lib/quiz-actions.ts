"use server";

import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import { redirect } from "next/navigation";

export type SafeQuestion = {
  id: number;
  category: string;
  questionText: string;
  choices: string[];
};

export type QuizAnswer = {
  questionId: number;
  selectedIndex: number;
};

export async function getRandomQuestions(): Promise<SafeQuestion[]> {
  const questions = await prisma.$queryRawUnsafe<
    { id: number; category: string; questionText: string; choices: string }[]
  >(`SELECT id, category, "questionText", choices FROM "Question" ORDER BY RANDOM() LIMIT 5`);

  return questions.map((q) => ({
    id: q.id,
    category: q.category,
    questionText: q.questionText,
    choices: typeof q.choices === "string" ? JSON.parse(q.choices) : q.choices as unknown as string[],
  }));
}

export async function submitQuiz(answers: QuizAnswer[]): Promise<string> {
  const session = await auth();
  if (!session?.user?.id) {
    redirect("/");
  }

  const questionIds = answers.map((a) => a.questionId);
  const questions = await prisma.question.findMany({
    where: { id: { in: questionIds } },
  });

  const questionMap = new Map(questions.map((q) => [q.id, q]));

  let score = 0;
  const details = answers.map((answer) => {
    const question = questionMap.get(answer.questionId);
    const isCorrect = question ? question.correctIndex === answer.selectedIndex : false;
    if (isCorrect) score++;
    return {
      questionId: answer.questionId,
      selectedChoiceIndex: answer.selectedIndex,
      isCorrect,
    };
  });

  const attempt = await prisma.quizAttempt.create({
    data: {
      userId: session.user.id,
      score,
      totalQuestions: answers.length,
      details: {
        create: details,
      },
    },
  });

  return attempt.id;
}

export async function getAttemptResult(attemptId: string) {
  const session = await auth();
  if (!session?.user?.id) {
    redirect("/");
  }

  const attempt = await prisma.quizAttempt.findUnique({
    where: { id: attemptId },
    include: {
      details: {
        include: {
          question: true,
        },
      },
    },
  });

  if (!attempt || attempt.userId !== session.user.id) {
    return null;
  }

  return attempt;
}

export async function getQuizHistory() {
  const session = await auth();
  if (!session?.user?.id) {
    redirect("/");
  }

  const attempts = await prisma.quizAttempt.findMany({
    where: { userId: session.user.id },
    orderBy: { createdAt: "desc" },
    select: {
      id: true,
      score: true,
      totalQuestions: true,
      createdAt: true,
    },
  });

  return attempts;
}
