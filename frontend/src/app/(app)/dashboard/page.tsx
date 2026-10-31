import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Upload } from "lucide-react";

import { BillChange } from "@/components/bills/bill-change";
import { BillList } from "@/components/bills/bill-list";
import { MetricCard } from "@/components/dashboard/metric-card";
import { PageHeader } from "@/components/layout/page-header";
import { ReminderItem } from "@/components/reminders/reminder-item";
import { priorityConfig } from "@/components/savings/recommendation-card";
import { Badge } from "@/components/ui/badge";
import { buttonClasses } from "@/components/ui/button";
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { formatCurrency, formatCurrencyRange } from "@/lib/formatting";
import { sampleBills } from "@/lib/mock-data/bills";
import { householdSummary } from "@/lib/mock-data/household";
import { MOCK_TODAY, sampleReminders } from "@/lib/mock-data/reminders";
import { sampleRecommendations } from "@/lib/mock-data/savings";

export const metadata: Metadata = { title: "Dashboard" };

export default function DashboardPage() {
  const { monthlyBills, previousMonthlyBills, potentialAnnualSavings, upcomingRenewals } = householdSummary;
  const nextReminders = [...sampleReminders].sort((a, b) => a.dueDate.localeCompare(b.dueDate)).slice(0, 3);
  const opportunities = sampleRecommendations.filter((rec) => rec.priority !== "no-action").slice(0, 3);

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
            explanation="Quarterly and yearly bills are shown as a monthly amount."
            href="/bills"
            linkLabel="View bills"
          />
          <MetricCard
            label="Potential yearly savings"
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
            explanation="Check details we read from your bills before they're used in calculations."
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

        <Card className="p-0 md:p-0">
          <CardHeader className="mb-0 border-b border-border px-4 py-4 md:px-5">
            <CardTitle>Upcoming reminders</CardTitle>
            <Link href="/reminders" className={buttonClasses({ variant: "tertiary", size: "sm" })}>
              View all
            </Link>
          </CardHeader>
          <ul className="divide-y divide-border">
            {nextReminders.map((reminder) => (
              <ReminderItem key={reminder.id} reminder={reminder} today={MOCK_TODAY} compact />
            ))}
          </ul>
        </Card>

        <Card className="p-0 md:p-0 lg:col-span-3">
          <CardHeader className="mb-0 border-b border-border px-4 py-4 md:px-5">
            <div>
              <CardTitle>Savings opportunities</CardTitle>
              <CardDescription>Estimates to check, not money saved yet.</CardDescription>
            </div>
            <Link href="/savings" className={buttonClasses({ variant: "tertiary", size: "sm" })}>
              View all
            </Link>
          </CardHeader>
          <ul className="grid grid-cols-1 divide-y divide-border md:grid-cols-3 md:divide-x md:divide-y-0">
            {opportunities.map((rec) => (
              <li key={rec.id}>
                <Link href="/savings" className="group flex h-full flex-col gap-2 p-4 hover:bg-neutral-50 md:p-5">
                  <Badge variant={priorityConfig[rec.priority].variant} className="self-start">
                    {priorityConfig[rec.priority].label}
                  </Badge>
                  <p className="text-body font-semibold text-neutral-950">{rec.title}</p>
                  <p className="text-body text-neutral-800 tabular-nums">
                    {rec.annualSaving
                      ? `${formatCurrencyRange(rec.annualSaving.min, rec.annualSaving.max)} a year (estimate)`
                      : rec.annualSavingNote}
                  </p>
                  <span className="mt-auto inline-flex items-center gap-1 text-label font-semibold text-brand-700 group-hover:underline">
                    Details
                    <ArrowRight className="size-4" aria-hidden="true" />
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </Card>
      </div>
    </>
  );
}
