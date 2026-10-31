import type { Metadata } from "next";

import { PageHeader } from "@/components/layout/page-header";
import { RecommendationCard } from "@/components/savings/recommendation-card";
import { Alert } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { formatCurrencyRange } from "@/lib/formatting";
import { householdSummary } from "@/lib/mock-data/household";
import { sampleRecommendations } from "@/lib/mock-data/savings";
import type { RecommendationPriority } from "@/types/savings";

export const metadata: Metadata = { title: "Savings Planner" };

const groups: { priority: RecommendationPriority; heading: string }[] = [
  { priority: "potential-saving", heading: "Potential savings" },
  { priority: "worth-checking", heading: "Worth checking" },
  { priority: "long-term", heading: "Long-term improvements" },
  { priority: "needs-info", heading: "Needs more information" },
  { priority: "no-action", heading: "No action needed" },
];

export default function SavingsPage() {
  const { potentialAnnualSavings } = householdSummary;

  return (
    <>
      <PageHeader
        title="Savings planner"
        description="Options worth checking, based on your bills and your home."
      />

      <div className="mb-8 grid grid-cols-1 gap-4 md:grid-cols-3 lg:gap-5">
        <Card>
          <div className="flex items-center justify-between gap-2">
            <p className="text-label text-neutral-700">Potential yearly savings</p>
            <Badge>Estimate</Badge>
          </div>
          <p className="mt-2 text-metric text-neutral-950 tabular-nums">
            {formatCurrencyRange(potentialAnnualSavings.min, potentialAnnualSavings.max)}
          </p>
          <p className="mt-1 text-caption text-muted-foreground">Across options we could estimate</p>
        </Card>
        <Alert className="md:col-span-2" title="These are estimates, not money saved">
          Each figure shows what you might save if you act on it. We&apos;ll only count a saving once you&apos;ve
          confirmed it, for example by uploading a cheaper bill.
        </Alert>
      </div>

      <div className="flex flex-col gap-8">
        {groups.map(({ priority, heading }) => {
          const items = sampleRecommendations.filter((rec) => rec.priority === priority);
          if (items.length === 0) return null;
          return (
            <section key={priority} aria-labelledby={`group-${priority}`}>
              <h2 id={`group-${priority}`} className="mb-4 text-section-title text-neutral-950">
                {heading}
              </h2>
              <div className="grid grid-cols-1 gap-4 lg:grid-cols-2 lg:gap-5">
                {items.map((rec) => (
                  <RecommendationCard key={rec.id} recommendation={rec} />
                ))}
              </div>
            </section>
          );
        })}
      </div>
    </>
  );
}
