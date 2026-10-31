export type PlanId = "free" | "plus" | "complete";

export type BillingPeriod = "monthly" | "annual";

export interface Plan {
  id: PlanId;
  name: string;
  description: string;
  monthlyPrice: number;
  annualPrice: number;
  features: string[];
  highlighted?: boolean;
}
