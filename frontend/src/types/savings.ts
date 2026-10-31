export type RecommendationPriority =
  | "potential-saving"
  | "worth-checking"
  | "long-term"
  | "needs-info"
  | "no-action";

export type EvidenceLevel = "based-on-bill" | "calculated" | "estimated" | "more-info-needed";

export interface MoneyRange {
  min: number;
  max: number;
}

export interface CalculationDetails {
  inputs: string[];
  assumptions: string[];
  timeHorizon: string;
  oneOffCosts: string;
  ongoingCosts: string;
  uncertainties: string[];
}

export interface SavingsRecommendation {
  id: string;
  title: string;
  category: string;
  reason: string;
  priority: RecommendationPriority;
  evidence: EvidenceLevel;
  /** null when we can't estimate honestly yet */
  annualSaving: MoneyRange | null;
  /** Shown instead of a figure when annualSaving is null */
  annualSavingNote?: string;
  oneOffCost?: MoneyRange;
  paybackYears?: MoneyRange;
  calculation?: CalculationDetails;
  action?: { label: string; href: string };
}
