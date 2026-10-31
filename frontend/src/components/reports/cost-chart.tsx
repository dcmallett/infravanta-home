import { formatCurrency, formatCurrencyWhole, formatMonthYear, formatShortMonth } from "@/lib/formatting";

interface CostChartProps {
  /** null = no data for that month, drawn differently from zero */
  data: { month: string; total: number | null }[];
}

/**
 * Single-series bar chart. Hidden from screen readers — the page provides a text
 * summary and a table with the same figures.
 */
export function CostChart({ data }: CostChartProps) {
  const values = data.flatMap((point) => (point.total === null ? [] : [point.total]));
  const scaleMax = Math.ceil(Math.max(...values) / 100) * 100;
  const ticks = [0, 0.25, 0.5, 0.75, 1].map((fraction) => fraction * scaleMax);

  return (
    <div aria-hidden="true" className="flex gap-2 pt-10">
      <div className="relative h-56 w-12 shrink-0 text-caption text-muted-foreground tabular-nums">
        {ticks.map((tick) => (
          <span key={tick} className="absolute right-0 translate-y-1/2" style={{ bottom: `${(tick / scaleMax) * 100}%` }}>
            {formatCurrencyWhole(tick)}
          </span>
        ))}
      </div>

      <div className="min-w-0 flex-1">
        <div className="relative h-56">
          {ticks.map((tick) => (
            <div
              key={tick}
              className={tick === 0 ? "absolute inset-x-0 border-t border-neutral-400" : "absolute inset-x-0 border-t border-neutral-200"}
              style={{ bottom: `${(tick / scaleMax) * 100}%` }}
            />
          ))}
          <div className="relative flex h-full items-end gap-2 sm:gap-4">
            {data.map((point) => {
              const height = point.total === null ? 0 : (point.total / scaleMax) * 100;
              return (
                <div key={point.month} className="group relative flex h-full flex-1 items-end justify-center">
                  {point.total === null ? (
                    <div className="h-8 w-full max-w-12 rounded-t-[4px] border border-dashed border-neutral-400" />
                  ) : (
                    <div
                      className="w-full max-w-12 rounded-t-[4px] bg-brand-500 transition-colors duration-150 group-hover:bg-brand-700"
                      style={{ height: `${height}%` }}
                    />
                  )}
                  <div
                    className="pointer-events-none absolute left-1/2 z-10 hidden -translate-x-1/2 rounded-md bg-brand-950 px-2.5 py-1.5 text-caption whitespace-nowrap text-white shadow-overlay group-hover:block group-hover:animate-fade-in"
                    style={{ bottom: `calc(${point.total === null ? 0 : height}% + ${point.total === null ? 40 : 8}px)` }}
                  >
                    <p className="font-semibold">{formatMonthYear(point.month)}</p>
                    <p className="tabular-nums">{point.total === null ? "No bills uploaded" : formatCurrency(point.total)}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        <div className="mt-2 flex gap-2 sm:gap-4">
          {data.map((point) => (
            <div key={point.month} className="flex-1 text-center text-caption text-muted-foreground">
              {formatShortMonth(point.month)}
              {point.total === null && <span className="block text-neutral-500">No data</span>}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
