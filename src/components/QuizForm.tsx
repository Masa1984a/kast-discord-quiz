"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { submitQuiz, type SafeQuestion } from "@/lib/quiz-actions";

export default function QuizForm({ questions }: { questions: SafeQuestion[] }) {
  const router = useRouter();
  const [answers, setAnswers] = useState<Record<number, number>>({});
  const [isPending, startTransition] = useTransition();

  const allAnswered = questions.every((q) => answers[q.id] !== undefined);

  function selectChoice(questionId: number, choiceIndex: number) {
    setAnswers((prev) => ({ ...prev, [questionId]: choiceIndex }));
  }

  function handleSubmit() {
    if (!allAnswered) return;

    const quizAnswers = questions.map((q) => ({
      questionId: q.id,
      selectedIndex: answers[q.id],
    }));

    startTransition(async () => {
      const attemptId = await submitQuiz(quizAnswers);
      router.push(`/results/${attemptId}`);
    });
  }

  const choiceLabels = ["A", "B", "C", "D", "E", "F"];

  return (
    <div className="space-y-6">
      {questions.map((q, qi) => (
        <div
          key={q.id}
          className="bg-kast-card rounded-xl border border-kast-border p-6"
        >
          <div className="flex items-start gap-3 mb-4">
            <span className="shrink-0 w-8 h-8 flex items-center justify-center rounded-lg bg-kast-accent/10 text-kast-accent text-sm font-bold">
              {qi + 1}
            </span>
            <div>
              <span className="text-xs font-semibold text-kast-muted uppercase tracking-wider">
                {q.category}
              </span>
              <p className="text-kast-text font-medium mt-1">{q.questionText}</p>
            </div>
          </div>
          <div className="grid gap-2 ml-11">
            {q.choices.map((choice, ci) => {
              const isSelected = answers[q.id] === ci;
              return (
                <button
                  key={ci}
                  onClick={() => selectChoice(q.id, ci)}
                  className={`text-left px-4 py-3 rounded-lg border transition-all text-sm ${
                    isSelected
                      ? "border-kast-accent bg-kast-accent/10 text-kast-text"
                      : "border-kast-border hover:border-kast-accent/40 text-kast-muted hover:text-kast-text"
                  }`}
                >
                  <span className="font-semibold mr-2 text-kast-accent">
                    {choiceLabels[ci]}.
                  </span>
                  {choice}
                </button>
              );
            })}
          </div>
        </div>
      ))}

      <div className="flex justify-center pt-4 pb-8">
        <button
          onClick={handleSubmit}
          disabled={!allAnswered || isPending}
          className="px-8 py-3 rounded-xl font-semibold text-sm transition-all disabled:opacity-40 disabled:cursor-not-allowed bg-kast-accent text-white hover:bg-kast-accent/90"
        >
          {isPending ? "Submitting..." : allAnswered ? "Submit Answers" : `Answer all ${questions.length} questions to submit`}
        </button>
      </div>
    </div>
  );
}
