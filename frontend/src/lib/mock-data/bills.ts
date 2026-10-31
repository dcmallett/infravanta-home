import type { Bill } from "@/types/bill";

// Realistic sample data so pages can be designed before Supabase is connected.
export const sampleBills: Bill[] = [
  {
    id: "bill_001",
    supplier: "Octopus Energy",
    category: "electricity",
    periodStart: "2026-09-04",
    periodEnd: "2026-10-03",
    amount: 68.4,
    frequency: "monthly",
    previousAmount: 61.2,
    status: "paid",
  },
  {
    id: "bill_002",
    supplier: "Octopus Energy",
    category: "gas",
    periodStart: "2026-09-04",
    periodEnd: "2026-10-03",
    amount: 32.1,
    frequency: "monthly",
    previousAmount: 26.85,
    status: "paid",
  },
  {
    id: "bill_003",
    supplier: "BT",
    category: "broadband",
    periodStart: "2026-10-01",
    periodEnd: "2026-10-31",
    amount: 39.99,
    frequency: "monthly",
    previousAmount: 39.99,
    status: "due-soon",
  },
  {
    id: "bill_004",
    supplier: "Thames Water",
    category: "water",
    periodStart: "2026-07-01",
    periodEnd: "2026-09-30",
    amount: 131.0,
    frequency: "quarterly",
    previousAmount: 138.5,
    status: "needs-review",
  },
  {
    id: "bill_005",
    supplier: "Bristol City Council",
    category: "council-tax",
    periodStart: "2026-10-01",
    periodEnd: "2026-10-31",
    amount: 182.0,
    frequency: "monthly",
    status: "processing",
  },
];

export const householdSummary = {
  monthlyBills: 184.5,
  previousMonthlyBills: 172.0,
  potentialAnnualSavings: { min: 120, max: 260 },
  upcomingRenewals: 2,
};
