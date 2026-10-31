"use client";

import { useState } from "react";

import { Button } from "@/components/ui/button";
import { Dialog } from "@/components/ui/dialog";
import { formatCurrency } from "@/lib/formatting";
import type { BillingPeriod, Plan, PlanId } from "@/types/subscription";

import { BillingPeriodToggle } from "./billing-period-toggle";
import { PlanCard } from "./plan-card";

interface PlanPickerProps {
  plans: Plan[];
  currentPlanId: PlanId;
}

export function PlanPicker({ plans, currentPlanId }: PlanPickerProps) {
  const [period, setPeriod] = useState<BillingPeriod>("monthly");
  const [selected, setSelected] = useState<Plan | null>(null);

  const price = selected ? (period === "monthly" ? selected.monthlyPrice : selected.annualPrice) : 0;

  return (
    <>
      <div className="mb-5 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <h2 className="text-section-title text-neutral-950">Plans</h2>
        <BillingPeriodToggle value={period} onChange={setPeriod} />
      </div>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-3 lg:gap-5">
        {plans.map((plan) => (
          <PlanCard
            key={plan.id}
            plan={plan}
            period={period}
            current={plan.id === currentPlanId}
            action={
              plan.id === currentPlanId ? undefined : (
                <Button
                  variant={plan.highlighted ? "primary" : "secondary"}
                  className="w-full"
                  onClick={() => setSelected(plan)}
                >
                  {plan.monthlyPrice === 0 ? "Switch to Free" : `Upgrade to ${plan.name}`}
                </Button>
              )
            }
          />
        ))}
      </div>

      <p className="mt-4 text-caption text-muted-foreground">
        Paid plans help you find and understand savings but can&apos;t guarantee them. You can cancel at any time from
        this page.
      </p>

      <Dialog
        open={selected !== null}
        onClose={() => setSelected(null)}
        title={selected ? `Upgrade to ${selected.name}` : ""}
        footer={
          <>
            <Button variant="secondary" onClick={() => setSelected(null)}>
              Not now
            </Button>
            {/* Static data: Stripe checkout is added later */}
            <Button onClick={() => setSelected(null)}>
              Confirm and pay {formatCurrency(price)}
            </Button>
          </>
        }
      >
        {selected && (
          <div className="flex flex-col gap-3 text-body text-neutral-800">
            <p>
              {period === "monthly"
                ? `You'll pay ${formatCurrency(selected.monthlyPrice)} today and then every month.`
                : `You'll pay ${formatCurrency(selected.annualPrice)} today for 12 months. It renews yearly at the same price unless you cancel.`}
            </p>
            <p>You can cancel at any time from the Subscription page. Your plan stays active until the end of the period you&apos;ve paid for.</p>
          </div>
        )}
      </Dialog>
    </>
  );
}
