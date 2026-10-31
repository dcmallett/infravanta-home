import type { Metadata } from "next";
import { ChevronRight, Download } from "lucide-react";

import { billCategories } from "@/components/bills/bill-category";
import { PageHeader } from "@/components/layout/page-header";
import { CostChart } from "@/components/reports/cost-chart";
import { Button } from "@/components/ui/button";
import { Card, CardDescription, CardTitle } from "@/components/ui/card";
import { toMonthly } from "@/lib/calculations/bills";
import { formatCurrency, formatMonthYear } from "@/lib/formatting";
import { sampleBills } from "@/lib/mock-data/bills";
import { monthlyCosts } from "@/lib/mock-data/reports";

export const metadata: Metadata = { title: "Reports" };

export default function ReportsPage() {
  const known = monthlyCosts.flatMap((point) => (point.total === null ? [] : [{ ...point, total: point.total }]));
  const average = known.reduce((sum, point) => sum + point.total, 0) / known.length;
  const highest = known.reduce((max, point) => (point.total > max.total ? point : max));
  const missing = monthlyCosts.filter((point) => point.total === null);
  const first = monthlyCosts[0].month;
  const last = monthlyCosts[monthlyCosts.length - 1].month;

  const breakdown = sampleBills
    .map((bill) => ({ id: bill.id, label: billCategories[bill.category].label, amount: toMonthly(bill.amount, bill.frequency) }))
    .sort((a, b) => b.amount - a.amount);
  const breakdownTotal = breakdown.reduce((sum, item) => sum + item.amount, 0);

  return (
    <>
      <PageHeader
        title="Reports"
        description="How your household costs are changing over time."
        action={
          <Button variant="secondary">
            <Download aria-hidden="true" />
            Download report
          </Button>
        }
      />

      <div className="grid grid-cols-1 gap-4 lg:grid-cols-3 lg:gap-5">
        <Card className="lg:col-span-2">
          <CardTitle>Household bills by month</CardTitle>
          <CardDescription>
            Monthly equivalent of all your bills, {formatMonthYear(first)} to {formatMonthYear(last)}
          </CardDescription>

          <CostChart data={monthlyCosts} />

          <p className="mt-5 text-body text-neutral-800">
            Your bills averaged <strong className="tabular-nums">{formatCurrency(average)}</strong> a month.{" "}
            {formatMonthYear(highest.month)} was the highest at{" "}
            <strong className="tabular-nums">{formatCurrency(highest.total)}</strong>.
            {missing.length > 0 &&
              ` ${missing.map((point) => formatMonthYear(point.month)).join(", ")} ${missing.length === 1 ? "is" : "are"} missing because no bills were uploaded.`}
          </p>

          <details className="group mt-4">
            <summary className="flex cursor-pointer list-none items-center gap-1 text-label font-semibold text-brand-700 [&::-webkit-details-marker]:hidden">
              <ChevronRight className="size-4 transition-transform duration-150 group-open:rotate-90" aria-hidden="true" />
              View as a table
            </summary>
            <table className="mt-3 w-full text-body">
              <caption className="sr-only">Household bills by month</caption>
              <thead>
                <tr className="border-b border-border text-left text-label text-muted-foreground">
                  <th scope="col" className="pb-2 font-medium">
                    Month
                  </th>
                  <th scope="col" className="pb-2 text-right font-medium">
                    Total
                  </th>
                </tr>
              </thead>
              <tbody>
                {monthlyCosts.map((point) => (
                  <tr key={point.month} className="border-b border-border last:border-0">
                    <th scope="row" className="py-2.5 text-left font-normal text-neutral-950">
                      {formatMonthYear(point.month)}
                    </th>
                    <td className="py-2.5 text-right tabular-nums">
                      {point.total === null ? (
                        <span className="text-muted-foreground">No data</span>
                      ) : (
                        formatCurrency(point.total)
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </details>
        </Card>

        <Card>
          <CardTitle>Where your money goes</CardTitle>
          <CardDescription>Monthly equivalent, {formatMonthYear(last)}</CardDescription>
          <ul className="mt-5 flex flex-col gap-4">
            {breakdown.map((item) => {
              const share = (item.amount / breakdownTotal) * 100;
              return (
                <li key={item.id}>
                  <div className="mb-1.5 flex items-baseline justify-between gap-3 text-body">
                    <span className="text-neutral-950">{item.label}</span>
                    <span className="text-neutral-800 tabular-nums">
                      {formatCurrency(item.amount)}{" "}
                      <span className="text-caption text-muted-foreground">({Math.round(share)}%)</span>
                    </span>
                  </div>
                  <div className="h-2 overflow-hidden rounded-full bg-muted" aria-hidden="true">
                    <div className="h-full rounded-full bg-brand-500" style={{ width: `${share}%` }} />
                  </div>
                </li>
              );
            })}
          </ul>
          <p className="mt-5 border-t border-border pt-4 text-body font-semibold text-neutral-950 tabular-nums">
            Total {formatCurrency(breakdownTotal)} a month
          </p>
        </Card>
      </div>
    </>
  );
}
