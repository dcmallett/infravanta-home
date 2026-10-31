const shortDate = new Intl.DateTimeFormat("en-GB", {
  day: "numeric",
  month: "short",
  year: "numeric",
});

const monthYear = new Intl.DateTimeFormat("en-GB", { month: "long", year: "numeric" });
const shortMonth = new Intl.DateTimeFormat("en-GB", { month: "short" });
const dayOfMonth = new Intl.DateTimeFormat("en-GB", { day: "numeric" });
const relative = new Intl.RelativeTimeFormat("en-GB", { numeric: "auto" });

/** 4 Oct 2026 */
export function formatDate(iso: string) {
  return shortDate.format(new Date(iso));
}

/** 4 Sept – 3 Oct 2026 */
export function formatDateRange(startIso: string, endIso: string) {
  return shortDate.formatRange(new Date(startIso), new Date(endIso));
}

/** October 2026 */
export function formatMonthYear(iso: string) {
  return monthYear.format(new Date(iso));
}

/** Oct */
export function formatShortMonth(iso: string) {
  return shortMonth.format(new Date(iso));
}

/** 4 */
export function formatDayOfMonth(iso: string) {
  return dayOfMonth.format(new Date(iso));
}

/** Whole days from one ISO date to another, ignoring time zones. */
export function daysBetween(fromIso: string, toIso: string) {
  const toUtc = (iso: string) => {
    const [y, m, d] = iso.slice(0, 10).split("-").map(Number);
    return Date.UTC(y, m - 1, d);
  };
  return Math.round((toUtc(toIso) - toUtc(fromIso)) / 86_400_000);
}

/** "Today", "Tomorrow", "In 12 days", "3 days ago" */
export function formatRelativeDays(iso: string, todayIso: string) {
  const text = relative.format(daysBetween(todayIso, iso), "day");
  return text.charAt(0).toUpperCase() + text.slice(1);
}
