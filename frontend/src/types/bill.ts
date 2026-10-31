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

export interface BillCharge {
  label: string;
  /** e.g. "193 kWh at 25.98p/kWh" */
  detail?: string;
  amount: number;
}

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
  dueDate?: string;
  /** Stored in full; only ever displayed masked */
  accountNumber?: string;
  tariff?: string;
  charges?: BillCharge[];
  documentName?: string;
}

export interface BillInsight {
  explanation: string;
  suggestedActions: string[];
}
