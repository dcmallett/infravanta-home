import Link from "next/link";
import { ArrowLeft } from "lucide-react";

interface PageHeaderProps {
  title: string;
  description?: string;
  /** The page's one primary action */
  action?: React.ReactNode;
  back?: { href: string; label: string };
}

export function PageHeader({ title, description, action, back }: PageHeaderProps) {
  return (
    <div className="mb-6 lg:mb-8">
      {back && (
        <Link
          href={back.href}
          className="mb-3 inline-flex items-center gap-1.5 text-label font-semibold text-brand-700 hover:underline"
        >
          <ArrowLeft className="size-4" aria-hidden="true" />
          {back.label}
        </Link>
      )}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h1 className="text-[24px] leading-8 font-[650] text-neutral-950 md:text-page-title">{title}</h1>
          {description && <p className="mt-1 text-body-lg text-muted-foreground">{description}</p>}
        </div>
        {action && <div className="flex shrink-0 flex-col gap-3 sm:flex-row *:w-full sm:*:w-auto">{action}</div>}
      </div>
    </div>
  );
}
