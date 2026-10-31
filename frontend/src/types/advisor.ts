export interface AdvisorFigure {
  label: string;
  value: string;
}

export interface AdvisorMessage {
  id: string;
  role: "user" | "assistant";
  /** Direct answer followed by the explanation */
  content: string;
  figures?: AdvisorFigure[];
  /** e.g. "Based on your uploaded bill", "Estimated" */
  trustLabels?: string[];
  assumptions?: string[];
  nextStep?: { label: string; href: string };
}
