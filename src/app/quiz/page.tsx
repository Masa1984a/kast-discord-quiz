import { auth } from "@/auth";
import { redirect } from "next/navigation";
import Header from "@/components/Header";
import QuizForm from "@/components/QuizForm";
import { getRandomQuestions } from "@/lib/quiz-actions";

export default async function QuizPage() {
  const session = await auth();
  if (!session?.user) redirect("/");

  const questions = await getRandomQuestions();

  return (
    <>
      <Header />
      <main className="max-w-4xl mx-auto px-4 py-8">
        <div className="text-center mb-8">
          <p className="text-kast-accent font-semibold text-sm uppercase tracking-widest mb-2">
            KAST Quiz Challenge
          </p>
          <h1 className="text-2xl md:text-3xl font-extrabold text-white mb-2">
            Answer 5 Questions
          </h1>
          <p className="text-kast-muted text-sm">
            Select your answer for each question, then submit to see your results.
          </p>
        </div>
        <QuizForm questions={questions} />
      </main>
    </>
  );
}
