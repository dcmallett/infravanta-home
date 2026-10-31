import type { Metadata } from "next";
import Link from "next/link";
import { CalendarClock, Upload } from "lucide-react";

import { BillChange } from "@/components/bills/bill-change";
import { BillList } from "@/components/bills/bill-list";
import { MetricCard } from "@/components/dashboard/metric-card";
import { PageHeader } from "@/components/layout/page-header";
import { Badge } from "@/components/ui/badge";
import { buttonClasses } from "@/components/ui/button";
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { EmptyState } from "@/components/ui/empty-state";
import { formatCurrency, formatCurrencyRange } from "@/lib/formatting";
import { householdSummary, sampleBills } from "@/lib/mock-data/bills";

export const metadata: Metadata = { title: "Dashboard" };

export default function DashboardPage() {
  const { monthlyBills, previousMonthlyBills, potentialAnnualSavings, upcomingRenewals } = householdSummary;

  return (
    <>
      <PageHeader
        title="Good morning, Alex"
        description="Here's where your household money is going this month."
        action={
          <Link href="/bills/upload" className={buttonClasses()}>
            <Upload aria-hidden="true" />
            Upload a bill
          </Link>
        }
      />

      <section aria-labelledby="summary-heading" className="mb-8">
        <h2 id="summary-heading" className="sr-only">
          Household cost summary
        </h2>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:gap-5 xl:grid-cols-4">
          <MetricCard
            label="Monthly household bills"
            value={formatCurrency(monthlyBills)}
            comparison={<BillChange current={monthlyBills} previous={previousMonthlyBills} periodLabel="last month" />}
            href="/bills"
            linkLabel="View bills"
          />
          <MetricCard
            label="Potential annual savings"
            value={formatCurrencyRange(potentialAnnualSavings.min, potentialAnnualSavings.max)}
            tag={<Badge>Estimate</Badge>}
            explanation="Based on your uploaded bills. Not yet saved — check each option to confirm."
            href="/savings"
            linkLabel="See opportunities"
          />
          <MetricCard
            label="Upcoming renewals"
            value={String(upcomingRenewals)}
            explanation="Contracts ending in the next 60 days."
            href="/reminders"
            linkLabel="View reminders"
          />
          <MetricCard
            label="Bills needing review"
            value={String(sampleBills.filter((b) => b.status === "needs-review").length)}
            explanation="Check extracted details before they're used in calculations."
            href="/bills"
            linkLabel="Review now"
          />
        </div>
      </section>

      <div className="grid grid-cols-1 gap-4 lg:grid-cols-3 lg:gap-5">
        <Card className="p-0 md:p-0 lg:col-span-2">
          <CardHeader className="mb-0 border-b border-border px-4 py-4 md:px-5">
            <div>
              <CardTitle>Recent bills</CardTitle>
              <CardDescription>Your latest bills and how they compare.</CardDescription>
            </div>
            <Link href="/bills" className={buttonClasses({ variant: "tertiary", size: "sm" })}>
              View all
            </Link>
          </CardHeader>
          <BillList bills={sampleBills.slice(0, 3)} />
        </Card>

        <Card>
          <CardHeader className="mb-0">
            <CardTitle>Upcoming reminders</CardTitle>
          </CardHeader>
          <EmptyState
            icon={CalendarClock}
            title="No reminders yet"
            description="Add a contract end date to a bill and we'll remind you before it renews."
            className="py-6"
          />
        </Card>
      </div>
    </>
  );
}
