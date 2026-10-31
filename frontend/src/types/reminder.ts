export type ReminderType = "renewal" | "payment" | "meter-reading" | "review";

export interface Reminder {
  id: string;
  title: string;
  description: string;
  dueDate: string;
  type: ReminderType;
  relatedBillId?: string;
}
