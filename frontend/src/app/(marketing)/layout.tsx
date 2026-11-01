import Link from "next/link";

import { buttonClasses } from "@/components/ui/button";

export default function MarketingLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-dvh flex-col bg-card">
      <header className="border-b border-border">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-4 px-4 md:px-6 lg:px-8">
          <Link href="/" className="text-body-lg font-semibold text-brand-900">
            Infravanta Home
          </Link>
          <nav aria-label="Main" className="flex items-center gap-2 sm:gap-4">
            <Link
              href="/about"
              className="flex min-h-11 items-center rounded-md px-2 text-label text-neutral-800 hover:text-brand-700 hover:underline"
            >
              About
            </Link>
            <Link href="/sign-in" className={buttonClasses({ variant: "secondary", size: "sm" })}>
              Sign in
            </Link>
          </nav>
        </div>
      </header>

      <main className="flex-1">{children}</main>

      <footer className="border-t border-border">
        <div className="mx-auto flex max-w-7xl flex-col gap-3 px-4 py-6 text-caption text-muted-foreground sm:flex-row sm:items-center sm:justify-between md:px-6 lg:px-8">
          <p>Infravanta Home provides information, not regulated financial advice.</p>
          <nav aria-label="Footer" className="flex gap-4">
            <Link href="/about" className="hover:text-brand-700 hover:underline">
              About
            </Link>
            <Link href="/sign-in" className="hover:text-brand-700 hover:underline">
              Sign in
            </Link>
          </nav>
        </div>
      </footer>
    </div>
  );
}
