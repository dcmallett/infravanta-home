import Link from "next/link";

export default function OnboardingLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-dvh flex-col">
      <header className="border-b border-border bg-card">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 md:px-6 lg:px-8">
          <span className="text-body-lg font-semibold text-brand-900">Infravanta Home</span>
          <Link href="/dashboard" className="text-label font-semibold text-brand-700 hover:underline">
            Finish later
          </Link>
        </div>
      </header>
      <main className="flex-1 px-4 py-8 md:py-12">{children}</main>
    </div>
  );
}
