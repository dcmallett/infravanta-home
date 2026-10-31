import Link from "next/link";

import { formatCurrency, formatDateRange } from "@/lib/formatting";
import type { Bill } from "@/types/bill";

import { BillChange } from "./bill-change";
import { billCategories, frequencyLabel, previousPeriodLabel } from "./bill-category";
import { BillStatusBadge } from "./bill-status-badge";

/** One bill as a stacked row — works on mobile without a wide table. */
export function BillListItem({ bill }: { bill: Bill }) {
  const { label, icon: Icon } = billCategories[bill.category];

  return (
    <li>
      <Link
        href={`/bills/${bill.id}`}
        className="flex items-start gap-3 px-4 py-4 transition-colors duration-150 hover:bg-neutral-50 md:px-5"
      >
        <span className="mt-0.5 flex size-10 shrink-0 items-center justify-center rounded-md bg-brand-50 text-brand-700">
          <Icon className="size-5" aria-hidden="true" />
        </span>

        <div className="flex min-w-0 flex-1 flex-col gap-1 sm:flex-row sm:items-start sm:justify-between sm:gap-4">
          <div className="min-w-0">
            <div className="flex flex-wrap items-center gap-2">
              <p className="truncate text-body font-semibold text-neutral-950">{bill.supplier}</p>
              <BillStatusBadge status={bill.status} />
            </div>
            <p className="text-caption text-muted-foreground">
              {label} · {frequencyLabel[bill.frequency]} · {formatDateRange(bill.periodStart, bill.periodEnd)}
            </p>
          </div>

          <div className="flex flex-col sm:items-end">
            <p className="text-body-lg font-semibold text-neutral-950 tabular-nums">{formatCurrency(bill.amount)}</p>
            <BillChange
              current={bill.amount}
              previous={bill.previousAmount}
              periodLabel={previousPeriodLabel[bill.frequency]}
            />
          </div>
        </div>
      </Link>
    </li>
  );
}
