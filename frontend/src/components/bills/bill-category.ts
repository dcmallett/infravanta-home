import { Droplets, Flame, Landmark, ShieldCheck, Smartphone, Wifi, Zap, type LucideIcon } from "lucide-react";

import type { BillCategory, BillFrequency } from "@/types/bill";

export const billCategories: Record<BillCategory, { label: string; icon: LucideIcon }> = {
  electricity: { label: "Electricity", icon: Zap },
  gas: { label: "Gas", icon: Flame },
  broadband: { label: "Broadband", icon: Wifi },
  water: { label: "Water", icon: Droplets },
  "council-tax": { label: "Council tax", icon: Landmark },
  mobile: { label: "Mobile", icon: Smartphone },
  insurance: { label: "Insurance", icon: ShieldCheck },
};

export const billCategoryOptions = Object.entries(billCategories).map(([value, { label }]) => ({ value, label }));

export const frequencyLabel: Record<BillFrequency, string> = {
  monthly: "Monthly",
  quarterly: "Quarterly",
  annual: "Annual",
};

export const previousPeriodLabel: Record<BillFrequency, string> = {
  monthly: "last month",
  quarterly: "last quarter",
  annual: "last year",
};
