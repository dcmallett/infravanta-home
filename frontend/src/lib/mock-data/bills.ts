import type { Bill, BillInsight } from "@/types/bill";

// Static sample data so pages can be designed before Supabase is connected.
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
    dueDate: "2026-10-18",
    accountNumber: "A-4F92 1137890",
    tariff: "Flexible Octopus (variable)",
    documentName: "octopus-electricity-oct-2026.pdf",
    charges: [
      { label: "Electricity used", detail: "193 kWh at 25.98p/kWh", amount: 50.14 },
      { label: "Standing charge", detail: "30 days at 50.00p/day", amount: 15.0 },
      { label: "VAT", detail: "5%", amount: 3.26 },
    ],
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
    dueDate: "2026-10-18",
    accountNumber: "A-4F92 1137890",
    tariff: "Flexible Octopus (variable)",
    documentName: "octopus-gas-oct-2026.pdf",
    charges: [
      { label: "Gas used", detail: "333 kWh at 6.30p/kWh", amount: 20.98 },
      { label: "Standing charge", detail: "30 days at 31.97p/day", amount: 9.59 },
      { label: "VAT", detail: "5%", amount: 1.53 },
    ],
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
    dueDate: "2026-11-05",
    accountNumber: "GB12345678",
    tariff: "Full Fibre 500 (24-month contract)",
    documentName: "bt-broadband-oct-2026.pdf",
    charges: [{ label: "Full Fibre 500 package", detail: "Includes VAT", amount: 39.99 }],
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
    dueDate: "2026-11-14",
    accountNumber: "900417726",
    documentName: "thames-water-q3-2026.jpg",
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
    dueDate: "2026-11-01",
    documentName: "council-tax-2026-27.pdf",
  },
];

export const billInsights: Record<string, BillInsight> = {
  bill_001: {
    explanation:
      "Your electricity bill is £7.20 higher than last month. Your unit rate and standing charge haven't changed, so the increase comes from using more electricity. That's common as the evenings get darker.",
    suggestedActions: [
      "Submit a meter reading so your next bill isn't estimated.",
      "Check whether a time-of-use tariff could suit when you use electricity.",
    ],
  },
  bill_002: {
    explanation:
      "Your gas bill is £5.25 higher than last month. Your rates are unchanged, so this is from using more gas, most likely because the heating has started coming on.",
    suggestedActions: ["Review your thermostat schedule before winter.", "Check your loft insulation in My Home."],
  },
  bill_003: {
    explanation:
      "Your broadband bill is the same as last month. Your 24-month contract ends soon, and prices often rise once the minimum term is over.",
    suggestedActions: ["Compare options before your contract ends.", "Ask BT for their retention offer."],
  },
};

export function getBillById(id: string) {
  return sampleBills.find((bill) => bill.id === id);
}
