import Link from "next/link";

import { Badge, type BadgeVariant } from "@/components/ui/badge";
import { daysBetween, formatDayOfMonth, formatRelativeDays, formatShortMonth } from "@/lib/formatting";
import { cn } from "@/lib/utils";
import type { Reminder, ReminderType } from "@/types/reminder";

export const reminderTypeConfig: Record<ReminderType, { label: string; variant: BadgeVariant }> = {
  renewal: { label: "Renewal", variant: "warning" },
  payment: { label: "Payment", variant: "neutral" },
  "meter-reading": { label: "Meter reading", variant: "info" },
  review: { label: "Needs review", variant: "info" },
};

interface ReminderItemProps {
  reminder: Reminder;
  today: string;
  /** Hide the description, e.g. on the dashboard */
  compact?: boolean;
}

export function ReminderItem({ reminder, today, compact = false }: ReminderItemProps) {
  const type = reminderTypeConfig[reminder.type];
  const soon = daysBetween(today, reminder.dueDate) <= 7;

  const body = (
    <>
      <div
        className={cn(
          "flex w-12 shrink-0 flex-col items-center rounded-md py-1.5",
          soon ? "bg-warning-background text-warning" : "bg-muted text-neutral-800",
        )}
        aria-hidden="true"
      >
        <span className="text-caption font-medium uppercase">{formatShortMonth(reminder.dueDate)}</span>
        <span className="text-card-title tabular-nums">{formatDayOfMonth(reminder.dueDate)}</span>
      </div>
      <div className="min-w-0 flex-1">
        <p className="text-body font-semibold text-neutral-950">{reminder.title}</p>
        {!compact && <p className="mt-0.5 text-body text-muted-foreground">{reminder.description}</p>}
        <div className="mt-1.5 flex flex-wrap items-center gap-2">
          <Badge variant={type.variant}>{type.label}</Badge>
          <span className="text-caption text-neutral-700">{formatRelativeDays(reminder.dueDate, today)}</span>
        </div>
      </div>
    </>
  );

  const classes = "flex items-start gap-3 px-4 py-4 md:px-5";

  return (
    <li>
      {reminder.relatedBillId ? (
        <Link
          href={`/bills/${reminder.relatedBillId}`}
          className={cn(classes, "transition-colors duration-150 hover:bg-neutral-50")}
        >
          {body}
        </Link>
      ) : (
        <div className={classes}>{body}</div>
      )}
    </li>
  );
}
