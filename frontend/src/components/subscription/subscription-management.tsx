import { Card, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import type { Plan } from "@/types/subscription";

import { CurrentPlanBadge } from "./plan-card";

export function UsageIndicator({ used, limit }: { used: number; limit: number }) {
  return (
    <Progress label="Bill uploads this month" value={used} max={limit} valueText={`${used} of ${limit}`} />
  );
}

interface SubscriptionManagementProps {
  plan: Plan;
  usage?: { used: number; limit: number };
}

export function SubscriptionManagement({ plan, usage }: SubscriptionManagementProps) {
  const isFree = plan.monthlyPrice === 0;

  return (
    <Card className="grid grid-cols-1 gap-6 md:grid-cols-2">
      <div>
        <div className="flex items-center gap-2">
          <CardTitle>{plan.name} plan</CardTitle>
          <CurrentPlanBadge />
        </div>
        <p className="mt-1 text-body text-muted-foreground">
          {isFree
            ? "You're on the Free plan. No payment details are stored."
            : "Manage your payment details or cancel at any time."}
        </p>
        {!isFree && (
          <div className="mt-4 flex flex-wrap gap-4 text-label font-semibold">
            <a href="#" className="text-brand-700 hover:underline">
              Manage payment details
            </a>
            <a href="#" className="text-danger hover:underline">
              Cancel subscription
            </a>
          </div>
        )}
      </div>
      {usage && (
        <div className="md:border-l md:border-border md:pl-6">
          <UsageIndicator used={usage.used} limit={usage.limit} />
          <p className="mt-2 text-caption text-muted-foreground">Resets on the 1st of each month.</p>
        </div>
      )}
    </Card>
  );
}
