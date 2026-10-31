import { Check } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { formatCurrency } from "@/lib/formatting";
import { cn } from "@/lib/utils";
import type { BillingPeriod, Plan } from "@/types/subscription";

export function CurrentPlanBadge() {
  return <Badge variant="info">Current plan</Badge>;
}

export function FeatureList({ features }: { features: string[] }) {
  return (
    <ul className="flex flex-col gap-2.5">
      {features.map((feature) => (
        <li key={feature} className="flex items-start gap-2 text-body text-neutral-800">
          <Check className="mt-0.5 size-4 shrink-0 text-brand-700" aria-hidden="true" />
          {feature}
        </li>
      ))}
    </ul>
  );
}

interface PlanCardProps {
  plan: Plan;
  period: BillingPeriod;
  current: boolean;
  action?: React.ReactNode;
}

export function PlanCard({ plan, period, current, action }: PlanCardProps) {
  const price = period === "monthly" ? plan.monthlyPrice : plan.annualPrice;
  const isFree = price === 0;

  return (
    <Card className={cn("flex flex-col", plan.highlighted && "border-brand-500 ring-1 ring-brand-500")}>
      <div className="flex items-center justify-between gap-2">
        <h3 className="text-card-title text-neutral-950">{plan.name}</h3>
        {current && <CurrentPlanBadge />}
      </div>
      <p className="mt-1 text-body text-muted-foreground">{plan.description}</p>

      <p className="mt-5 flex items-baseline gap-1.5">
        <span className="text-metric text-neutral-950 tabular-nums">{isFree ? "£0" : formatCurrency(price)}</span>
        <span className="text-body text-muted-foreground">{isFree ? "for ever" : period === "monthly" ? "a month" : "a year"}</span>
      </p>
      <p className="mt-1 min-h-[17px] text-caption text-muted-foreground tabular-nums">
        {!isFree &&
          (period === "annual"
            ? `Billed ${formatCurrency(plan.annualPrice)} once a year (${formatCurrency(plan.annualPrice / 12)} a month)`
            : `Or ${formatCurrency(plan.annualPrice)} a year if billed yearly`)}
      </p>

      <div className="mt-5 mb-6">
        <FeatureList features={plan.features} />
      </div>

      <div className="mt-auto">
        {action ?? (
          <p className="flex h-11 items-center justify-center text-label text-muted-foreground">Your current plan</p>
        )}
      </div>
    </Card>
  );
}
