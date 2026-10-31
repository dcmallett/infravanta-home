import type { Bill, BillFrequency } from "@/types/bill";

const periodsPerYear: Record<BillFrequency, number> = { monthly: 12, quarterly: 4, annual: 1 };

function roundPennies(value: number) {
  return Math.round(value * 100) / 100;
}

/** Convert a bill amount to its monthly equivalent so different frequencies can be compared. */
export function toMonthly(amount: number, frequency: BillFrequency) {
  return roundPennies((amount * periodsPerYear[frequency]) / 12);
}

/** Total monthly-equivalent cost. "previous" falls back to the current amount when there's nothing to compare. */
export function totalMonthly(bills: Bill[], period: "current" | "previous" = "current") {
  return roundPennies(
    bills.reduce((sum, bill) => {
      const amount = period === "previous" ? (bill.previousAmount ?? bill.amount) : bill.amount;
      return sum + toMonthly(amount, bill.frequency);
    }, 0),
  );
}
