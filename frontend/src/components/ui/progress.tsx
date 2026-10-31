import { cn } from "@/lib/utils";

interface ProgressProps {
  label: string;
  value: number;
  max?: number;
  /** Text shown on the right, e.g. "3 of 5". Defaults to a percentage. */
  valueText?: string;
  className?: string;
}

export function Progress({ label, value, max = 100, valueText, className }: ProgressProps) {
  const percent = Math.min(100, Math.max(0, (value / max) * 100));
  const text = valueText ?? `${Math.round(percent)}%`;

  return (
    <div className={className}>
      <div className="mb-1.5 flex items-center justify-between gap-4 text-label">
        <span className="text-neutral-900">{label}</span>
        <span className="text-muted-foreground tabular-nums">{text}</span>
      </div>
      <div
        role="progressbar"
        aria-label={label}
        aria-valuemin={0}
        aria-valuemax={max}
        aria-valuenow={value}
        aria-valuetext={text}
        className="h-2 overflow-hidden rounded-full bg-muted"
      >
        <div
          className="h-full rounded-full bg-primary transition-[width] duration-200"
          style={{ width: `${percent}%` }}
        />
      </div>
    </div>
  );
}
