import Link from "next/link";
import { auth, signOut } from "@/auth";
import Image from "next/image";

export default async function Header() {
  const session = await auth();

  if (!session?.user) return null;

  return (
    <header className="sticky top-0 z-50 border-b border-kast-border bg-kast-bg/80 backdrop-blur-md">
      <div className="max-w-4xl mx-auto px-4 h-14 flex items-center justify-between">
        <div className="flex items-center gap-6">
          <Link href="/" className="text-kast-accent font-bold text-lg tracking-tight">
            KAST Quiz
          </Link>
          <nav className="flex items-center gap-4 text-sm">
            <Link href="/quiz" className="text-kast-muted hover:text-kast-text transition-colors">
              New Quiz
            </Link>
            <Link href="/history" className="text-kast-muted hover:text-kast-text transition-colors">
              History
            </Link>
          </nav>
        </div>
        <div className="flex items-center gap-3">
          {session.user.image && (
            <Image
              src={session.user.image}
              alt=""
              width={28}
              height={28}
              className="rounded-full"
            />
          )}
          <span className="text-sm text-kast-muted hidden sm:inline">
            {session.user.name}
          </span>
          <form
            action={async () => {
              "use server";
              await signOut({ redirectTo: "/" });
            }}
          >
            <button
              type="submit"
              className="text-xs text-kast-muted hover:text-kast-text border border-kast-border rounded-md px-3 py-1.5 transition-colors"
            >
              Sign out
            </button>
          </form>
        </div>
      </div>
    </header>
  );
}
