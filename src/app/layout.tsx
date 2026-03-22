import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import KastReferralFooter from "@/components/KastReferralFooter";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "KAST Discord Quiz",
  description: "Test your knowledge about KAST — the stablecoin-powered fintech platform",
  manifest: "/manifest.json",
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: "KAST Quiz",
  },
};

export const viewport: Viewport = {
  themeColor: "#000000",
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} h-full antialiased`}>
      <head>
        <link rel="icon" href="/icon-192x192.png" />
        <link rel="apple-touch-icon" href="/icon-180x180.png" />
      </head>
      <body className="min-h-full flex flex-col font-sans">
        {children}
        <KastReferralFooter />
      </body>
    </html>
  );
}
