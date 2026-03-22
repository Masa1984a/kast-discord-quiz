import Image from "next/image";
import { getActiveQuestionCount } from "@/lib/quiz-actions";

const REFERRAL_URL = "https://go.kast.xyz/VqVO/SAPPORO";

export default async function KastReferralFooter() {
  const questionCount = await getActiveQuestionCount();
  return (
    <footer className="max-w-4xl mx-auto px-4 pb-12 pt-4 mt-auto">
      <div className="bg-kast-card rounded-xl border border-kast-border p-6">
        <h3 className="text-lg font-bold text-white text-center mb-6">
          Join KAST Card
        </h3>
        <a
          href={REFERRAL_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="flex flex-col sm:flex-row items-center gap-4 p-4 rounded-lg border border-kast-border bg-[#0F0F0F] hover:border-kast-accent/40 transition-colors no-underline max-w-md mx-auto"
        >
          <div className="flex-shrink-0 p-2 bg-white rounded">
            <Image
              src="/qr-kast.png"
              alt="KAST referral QR code"
              width={80}
              height={80}
            />
          </div>
          <div className="flex-1 text-center sm:text-left">
            <p className="text-sm text-kast-muted mb-1">
              New to KAST? Get started in 2 minutes:
            </p>
            <span className="text-sm font-mono text-kast-accent break-all">
              {REFERRAL_URL}
            </span>
            <p className="text-xs text-kast-muted mt-2">
              Store, earn, move, and spend stablecoins globally.
            </p>
          </div>
        </a>
      </div>
      <p className="text-center text-xs text-kast-muted mt-6">
        KAST Discord Quiz Challenge (Unofficial) — {questionCount} Questions, Created by{" "}
        <a
          href="https://x.com/mStarJP"
          target="_blank"
          rel="noopener noreferrer"
          className="text-kast-accent hover:underline"
        >
          mStarJP
        </a>
      </p>
    </footer>
  );
}
