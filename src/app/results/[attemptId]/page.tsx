import { auth } from "@/auth";
import { redirect } from "next/navigation";
import Link from "next/link";
import Header from "@/components/Header";
import { getAttemptResult } from "@/lib/quiz-actions";

export default async function ResultsPage({
  params,
}: {
  params: Promise<{ attemptId: string }>;
}) {
  const session = await auth();
  if (!session?.user) redirect("/");

  const { attemptId } = await params;
  const attempt = await getAttemptResult(attemptId);

  if (!attempt) {
    return (
      <>
        <Header />
        <main className="max-w-4xl mx-auto px-4 py-16 text-center">
          <p className="text-kast-muted">Result not found.</p>
          <Link href="/quiz" className="text-kast-accent hover:underline mt-4 inline-block">
            Take a new quiz
          </Link>
        </main>
      </>
    );
  }

  const percentage = Math.round((attempt.score / attempt.totalQuestions) * 100);
  const choiceLabels = ["A", "B", "C", "D", "E", "F"];

  return (
    <>
      <Header />
      <main className="max-w-4xl mx-auto px-4 py-8">
        {/* Score Banner */}
        <div className="bg-kast-card rounded-xl border border-kast-border p-8 text-center mb-8">
          <p className="text-kast-accent font-semibold text-sm uppercase tracking-widest mb-3">
            Quiz Complete
          </p>
          <div className="text-6xl font-extrabold mb-2">
            <span className={attempt.score >= 3 ? "text-kast-correct" : "text-kast-incorrect"}>
              {attempt.score}
            </span>
            <span className="text-kast-muted">/{attempt.totalQuestions}</span>
          </div>
          <p className="text-kast-muted text-sm mb-6">
            {percentage}% correct — {attempt.score === 5 ? "Perfect score!" : attempt.score >= 3 ? "Great job!" : "Keep learning!"}
          </p>
          <div className="flex justify-center gap-3">
            <Link
              href="/quiz"
              className="px-6 py-2.5 rounded-xl font-semibold text-sm bg-kast-accent text-white hover:bg-kast-accent/90 transition-colors"
            >
              Try Again
            </Link>
            <Link
              href="/history"
              className="px-6 py-2.5 rounded-xl font-semibold text-sm border border-kast-border text-kast-muted hover:text-kast-text hover:border-kast-accent/40 transition-colors"
            >
              View History
            </Link>
          </div>
        </div>

        {/* Question Results */}
        <div className="space-y-6">
          {attempt.details.map((detail, i) => {
            const question = detail.question;
            const choices = question.choices as string[];
            return (
              <div
                key={detail.id}
                className="bg-kast-card rounded-xl border border-kast-border p-6"
              >
                <div className="flex items-start gap-3 mb-4">
                  <span
                    className={`shrink-0 w-8 h-8 flex items-center justify-center rounded-lg text-sm font-bold ${
                      detail.isCorrect
                        ? "bg-kast-correct/10 text-kast-correct"
                        : "bg-kast-incorrect/10 text-kast-incorrect"
                    }`}
                  >
                    {i + 1}
                  </span>
                  <div>
                    <span className="text-xs font-semibold text-kast-muted uppercase tracking-wider">
                      {question.category}
                    </span>
                    <p className="text-kast-text font-medium mt-1">
                      {question.questionText}
                    </p>
                  </div>
                </div>

                <div className="grid gap-2 ml-11 mb-4">
                  {choices.map((choice, ci) => {
                    const isCorrect = ci === question.correctIndex;
                    const isSelected = ci === detail.selectedChoiceIndex;
                    let className =
                      "text-left px-4 py-3 rounded-lg border text-sm ";

                    if (isCorrect) {
                      className +=
                        "border-kast-correct bg-kast-correct/10 text-kast-correct";
                    } else if (isSelected && !isCorrect) {
                      className +=
                        "border-kast-incorrect bg-kast-incorrect/10 text-kast-incorrect";
                    } else {
                      className += "border-kast-border text-kast-muted";
                    }

                    return (
                      <div key={ci} className={className}>
                        <span className="font-semibold mr-2">
                          {choiceLabels[ci]}.
                        </span>
                        {choice}
                        {isCorrect && (
                          <span className="ml-2 text-kast-correct">&#10003;</span>
                        )}
                        {isSelected && !isCorrect && (
                          <span className="ml-2 text-kast-incorrect">&#10007;</span>
                        )}
                      </div>
                    );
                  })}
                </div>

                {/* Explanation */}
                <div className="ml-11 rounded-lg bg-kast-accent/5 border border-kast-accent/10 p-4">
                  <p className="text-xs font-semibold text-kast-accent uppercase tracking-wider mb-2">
                    Explanation
                  </p>
                  <p className="text-sm text-kast-muted leading-relaxed">
                    {question.explanation}
                  </p>
                  {(() => {
                    const links = question.relatedLinks as {label: string, url: string}[] | undefined;
                    if (!links || links.length === 0) return null;
                    return (
                      <div className="mt-3 pt-3 border-t border-kast-accent/10">
                        <p className="text-xs font-semibold text-kast-accent uppercase tracking-wider mb-1.5">
                          Related Links
                        </p>
                        <ul className="space-y-1">
                          {links.map((link, li) => (
                            <li key={li}>
                              <a
                                href={link.url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-sm text-kast-accent hover:underline"
                              >
                                {link.label} &#8599;
                              </a>
                            </li>
                          ))}
                        </ul>
                      </div>
                    );
                  })()}
                </div>
              </div>
            );
          })}
        </div>
      </main>
    </>
  );
}
