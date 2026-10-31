import Link from "next/link";
import { SearchX } from "lucide-react";

import { buttonClasses } from "@/components/ui/button";
import { EmptyState } from "@/components/ui/empty-state";

export default function NotFound() {
  return (
    <main className="flex min-h-dvh items-center justify-center px-4">
      <EmptyState
        icon={SearchX}
        title="We can't find that page"
        description="It may have moved, or the link may be wrong."
        action={
          <Link href="/dashboard" className={buttonClasses()}>
            Go to your dashboard
          </Link>
        }
      />
    </main>
  );
}
