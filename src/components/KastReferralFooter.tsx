"use client";

import { useEffect, useRef } from "react";

const REFERRAL_URL = "https://go.kast.xyz/VqVO/SAPPORO";

function generateQR(canvas: HTMLCanvasElement, url: string) {
  const size = 80;
  canvas.width = size;
  canvas.height = size;
  const img = new Image();
  img.crossOrigin = "anonymous";
  img.src = `https://api.qrserver.com/v1/create-qr-code/?size=${size}x${size}&data=${encodeURIComponent(url)}&margin=2`;
  img.onload = () => {
    const ctx = canvas.getContext("2d");
    if (ctx) {
      ctx.fillStyle = "#ffffff";
      ctx.fillRect(0, 0, size, size);
      ctx.drawImage(img, 0, 0, size, size);
    }
  };
}

export default function KastReferralFooter() {
  const qrRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (qrRef.current) generateQR(qrRef.current, REFERRAL_URL);
  }, []);

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
            <canvas ref={qrRef} width={80} height={80} className="block w-[80px] h-[80px]" />
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
        KAST Discord Quiz Challenge — 70 Questions, Powered by KAST
      </p>
    </footer>
  );
}
