import type { MoneyRange } from "./savings";

export interface ProfileField {
  label: string;
  /** null means the user hasn't told us yet */
  value: string | null;
}

export interface ProfileSection {
  id: string;
  title: string;
  fields: ProfileField[];
}

export type Suitability = "likely-suitable" | "worth-checking" | "needs-info" | "unlikely";

export type ImprovementId = "insulation" | "heating" | "solar" | "battery" | "ev-charging" | "draught-proofing";

export interface HomeImprovement {
  id: ImprovementId;
  title: string;
  suitability: Suitability;
  summary: string;
  typicalCost: MoneyRange;
  benefits: string;
  limitations: string;
  infoNeeded: string[];
}
