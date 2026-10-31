import Link from "next/link";
import { ArrowRight } from "lucide-react";

import { Card } from "@/components/ui/card";

interface MetricCardProps {
  label: string;
  value: string;
  /** Badge such as "Estimate" shown next to the label */
  tag?: React.ReactNode;
  /** Comparison line — always state the period */
  comparison?: React.ReactNode;
  explanation?: string;
  href?: string;
  linkLabel?: string;
}

export function MetricCard({ label, value, tag, comparison, explanation, href, linkLabel }: MetricCardProps) {
  return (
    <Card className="flex flex-col">
      <div className="flex items-center justify-between gap-2">
        <p className="text-label text-neutral-700">{label}</p>
        {tag}
      </div>
      <p className="mt-2 text-metric text-neutral-950 tabular-nums">{value}</p>
      {comparison && <div className="mt-1 text-label">{comparison}</div>}
      {explanation && <p className="mt-3 text-caption text-muted-foreground">{explanation}</p>}
      {href && linkLabel && (
        <Link
          href={href}
          className="mt-auto inline-flex items-center gap-1 pt-4 text-label font-semibold text-brand-700 hover:underline"
        >
          {linkLabel}
          <ArrowRight className="size-4" aria-hidden="true" />
        </Link>
      )}
    </Card>
  );
}
