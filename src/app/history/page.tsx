import { auth } from "@/auth";
import { redirect } from "next/navigation";
import Link from "next/link";
import Header from "@/components/Header";
import { getQuizHistory } from "@/lib/quiz-actions";

export default async function HistoryPage() {
  const session = await auth();
  if (!session?.user) redirect("/");

  const attempts = await getQuizHistory();

  return (
    <>
      <Header />
      <main className="max-w-4xl mx-auto px-4 py-8">
        <div className="text-center mb-8">
          <p className="text-kast-accent font-semibold text-sm uppercase tracking-widest mb-2">
            Your Progress
          </p>
          <h1 className="text-2xl md:text-3xl font-extrabold text-white mb-2">
            Quiz History
          </h1>
          <p className="text-kast-muted text-sm">
            {attempts.length > 0
              ? `You've completed ${attempts.length} quiz${attempts.length === 1 ? "" : "zes"}`
              : "No quizzes taken yet"}
          </p>
        </div>

        {attempts.length === 0 ? (
          <div className="bg-kast-card rounded-xl border border-kast-border p-12 text-center">
            <p className="text-kast-muted mb-4">
              You haven&apos;t taken any quizzes yet.
            </p>
            <Link
              href="/quiz"
              className="px-6 py-2.5 rounded-xl font-semibold text-sm bg-kast-accent text-white hover:bg-kast-accent/90 transition-colors inline-block"
            >
              Start Your First Quiz
            </Link>
          </div>
        ) : (
          <div className="space-y-3">
            {attempts.map((attempt) => {
              const percentage = Math.round(
                (attempt.score / attempt.totalQuestions) * 100
              );
              const date = new Date(attempt.createdAt);
              return (
                <Link
                  key={attempt.id}
                  href={`/results/${attempt.id}`}
                  className="block bg-kast-card rounded-xl border border-kast-border p-5 hover:border-kast-accent/40 transition-colors"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <div
                        className={`w-12 h-12 rounded-lg flex items-center justify-center text-lg font-bold ${
                          attempt.score >= 3
                            ? "bg-kast-correct/10 text-kast-correct"
                            : "bg-kast-incorrect/10 text-kast-incorrect"
                        }`}
                      >
                        {attempt.score}/{attempt.totalQuestions}
                      </div>
                      <div>
                        <p className="text-kast-text font-medium text-sm">
                          {percentage}% correct
                        </p>
                        <p className="text-kast-muted text-xs">
                          {date.toLocaleDateString("en-US", {
                            year: "numeric",
                            month: "short",
                            day: "numeric",
                            hour: "2-digit",
                            minute: "2-digit",
                          })}
                        </p>
                      </div>
                    </div>
                    <span className="text-kast-muted text-sm">
                      View details &rarr;
                    </span>
                  </div>
                </Link>
              );
            })}
          </div>
        )}

        {attempts.length > 0 && (
          <div className="text-center mt-8">
            <Link
              href="/quiz"
              className="px-6 py-2.5 rounded-xl font-semibold text-sm bg-kast-accent text-white hover:bg-kast-accent/90 transition-colors inline-block"
            >
              Take Another Quiz
            </Link>
          </div>
        )}
      </main>
    </>
  );
}
