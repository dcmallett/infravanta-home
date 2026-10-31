import type { Reminder } from "@/types/reminder";

/** Fixed "today" for static data, so relative dates stay consistent. */
export const MOCK_TODAY = "2026-10-31";

export const sampleReminders: Reminder[] = [
  {
    id: "rem_001",
    title: "Check your Thames Water bill details",
    description: "We weren't sure about some details we read from this bill. Check them before they're used.",
    dueDate: "2026-10-31",
    type: "review",
    relatedBillId: "bill_004",
  },
  {
    id: "rem_002",
    title: "Council tax payment",
    description: "Monthly instalment of £182.00 to Bristol City Council.",
    dueDate: "2026-11-01",
    type: "payment",
    relatedBillId: "bill_005",
  },
  {
    id: "rem_003",
    title: "Submit electricity and gas meter readings",
    description: "Readings help keep your Octopus bills accurate rather than estimated.",
    dueDate: "2026-11-03",
    type: "meter-reading",
  },
  {
    id: "rem_004",
    title: "BT broadband contract ends",
    description: "Prices often rise after the minimum term. Compare options before it renews.",
    dueDate: "2026-11-12",
    type: "renewal",
    relatedBillId: "bill_003",
  },
  {
    id: "rem_005",
    title: "Home insurance renewal",
    description: "Your renewal quote should arrive about three weeks before this date.",
    dueDate: "2026-12-17",
    type: "renewal",
  },
];
