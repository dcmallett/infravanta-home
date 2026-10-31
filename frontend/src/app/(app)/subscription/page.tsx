import type { Metadata } from "next";

import { PageHeader } from "@/components/layout/page-header";
import { PlanPicker } from "@/components/subscription/plan-picker";
import { SubscriptionManagement } from "@/components/subscription/subscription-management";
import { currentSubscription, plans } from "@/lib/mock-data/plans";

export const metadata: Metadata = { title: "Subscription" };

export default function SubscriptionPage() {
  const currentPlan = plans.find((plan) => plan.id === currentSubscription.planId) ?? plans[0];

  return (
    <>
      <PageHeader title="Subscription" description="Your plan, usage and billing." />

      <div className="mb-10">
        <SubscriptionManagement
          plan={currentPlan}
          usage={
            currentPlan.id === "free"
              ? { used: currentSubscription.billUploadsUsed, limit: currentSubscription.billUploadLimit }
              : undefined
          }
        />
      </div>

      <PlanPicker plans={plans} currentPlanId={currentPlan.id} />
    </>
  );
}
