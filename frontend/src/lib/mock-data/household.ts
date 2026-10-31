import { totalMonthly } from "@/lib/calculations/bills";
import { daysBetween } from "@/lib/formatting";

import { sampleBills } from "./bills";
import { MOCK_TODAY, sampleReminders } from "./reminders";
import { sampleRecommendations } from "./savings";

// Derived from the other mock data so every page shows the same figures.
const estimates = sampleRecommendations.flatMap((rec) => (rec.annualSaving ? [rec.annualSaving] : []));

export const householdSummary = {
  monthlyBills: totalMonthly(sampleBills),
  previousMonthlyBills: totalMonthly(sampleBills, "previous"),
  potentialAnnualSavings: {
    min: estimates.reduce((sum, range) => sum + range.min, 0),
    max: estimates.reduce((sum, range) => sum + range.max, 0),
  },
  upcomingRenewals: sampleReminders.filter(
    (reminder) => reminder.type === "renewal" && daysBetween(MOCK_TODAY, reminder.dueDate) <= 60,
  ).length,
};
