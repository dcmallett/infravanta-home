import type { Metadata } from "next";

import { PageHeader } from "@/components/layout/page-header";
import { AddReminderButton } from "@/components/reminders/add-reminder-button";
import { ReminderItem } from "@/components/reminders/reminder-item";
import { Card, CardTitle } from "@/components/ui/card";
import { daysBetween } from "@/lib/formatting";
import { MOCK_TODAY, sampleReminders } from "@/lib/mock-data/reminders";
import type { Reminder } from "@/types/reminder";

export const metadata: Metadata = { title: "Reminders" };

function ReminderGroup({ title, reminders }: { title: string; reminders: Reminder[] }) {
  if (reminders.length === 0) return null;
  return (
    <Card className="p-0 md:p-0">
      <CardTitle className="border-b border-border px-4 py-4 md:px-5">{title}</CardTitle>
      <ul className="divide-y divide-border">
        {reminders.map((reminder) => (
          <ReminderItem key={reminder.id} reminder={reminder} today={MOCK_TODAY} />
        ))}
      </ul>
    </Card>
  );
}

export default function RemindersPage() {
  const sorted = [...sampleReminders].sort((a, b) => a.dueDate.localeCompare(b.dueDate));
  const next30 = sorted.filter((reminder) => daysBetween(MOCK_TODAY, reminder.dueDate) <= 30);
  const later = sorted.filter((reminder) => daysBetween(MOCK_TODAY, reminder.dueDate) > 30);

  return (
    <>
      <PageHeader
        title="Reminders"
        description="Renewals, payments and checks coming up for your household."
        action={<AddReminderButton />}
      />
      <div className="flex flex-col gap-5">
        <ReminderGroup title="Next 30 days" reminders={next30} />
        <ReminderGroup title="Later" reminders={later} />
      </div>
    </>
  );
}
