export type BillCategory =
  | "electricity"
  | "gas"
  | "broadband"
  | "water"
  | "council-tax"
  | "mobile"
  | "insurance";

export type BillFrequency = "monthly" | "quarterly" | "annual";

export type BillStatus = "paid" | "due-soon" | "needs-review" | "processing";

export interface Bill {
  id: string;
  supplier: string;
  category: BillCategory;
  periodStart: string;
  periodEnd: string;
  /** Total for the billing period, in pounds */
  amount: number;
  frequency: BillFrequency;
  /** Amount for the previous comparable period, if known */
  previousAmount?: number;
  status: BillStatus;
}
