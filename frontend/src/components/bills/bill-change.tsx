import { ArrowDownRight, ArrowUpRight, Minus } from "lucide-react";

import { formatCurrency } from "@/lib/formatting";
import { cn } from "@/lib/utils";

interface BillChangeProps {
  current: number;
  previous?: number;
  periodLabel?: string;
  className?: string;
}

/** Change against the previous comparable period, using icon + text as well as colour. */
export function BillChange({ current, previous, periodLabel = "last period", className }: BillChangeProps) {
  if (previous === undefined) {
    return <span className={cn("text-caption text-muted-foreground", className)}>No previous bill to compare</span>;
  }

  const diff = Math.round((current - previous) * 100) / 100;

  if (diff === 0) {
    return (
      <span className={cn("inline-flex items-center gap-1 text-caption text-muted-foreground", className)}>
        <Minus className="size-3.5" aria-hidden="true" />
        Same as {periodLabel}
      </span>
    );
  }

  const increased = diff > 0;
  const Icon = increased ? ArrowUpRight : ArrowDownRight;

  return (
    <span
      className={cn(
        "inline-flex items-center gap-1 text-caption tabular-nums",
        increased ? "text-danger" : "text-success",
        className,
      )}
    >
      <Icon className="size-3.5" aria-hidden="true" />
      {formatCurrency(Math.abs(diff))} {increased ? "more" : "less"} than {periodLabel}
    </span>
  );
}
