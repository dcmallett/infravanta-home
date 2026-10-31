import type { Plan, PlanId } from "@/types/subscription";

// Prices are hypotheses until tested with users (design system §14).
export const plans: Plan[] = [
  {
    id: "free",
    name: "Free",
    description: "Understand your bills and never miss a renewal.",
    monthlyPrice: 0,
    annualPrice: 0,
    features: ["Upload up to 5 bills a month", "Plain-English bill explanations", "Renewal reminders", "Savings checklist"],
  },
  {
    id: "plus",
    name: "Plus",
    description: "Get answers and comparisons for your household.",
    monthlyPrice: 4.99,
    annualPrice: 49.9,
    highlighted: true,
    features: [
      "Unlimited bill uploads",
      "AI Advisor for questions about your bills",
      "Tariff and contract comparisons",
      "Monthly household report",
    ],
  },
  {
    id: "complete",
    name: "Complete",
    description: "Plan home improvements with costs and payback.",
    monthlyPrice: 9.99,
    annualPrice: 99.9,
    features: [
      "Everything in Plus",
      "Home improvement planner with payback estimates",
      "Multiple properties",
      "Priority support",
    ],
  },
];

export const currentSubscription: { planId: PlanId; billUploadsUsed: number; billUploadLimit: number } = {
  planId: "free",
  billUploadsUsed: 3,
  billUploadLimit: 5,
};
