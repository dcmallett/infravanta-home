const shortDate = new Intl.DateTimeFormat("en-GB", {
  day: "numeric",
  month: "short",
  year: "numeric",
});

/** 4 Oct 2026 */
export function formatDate(iso: string) {
  return shortDate.format(new Date(iso));
}

/** 4 Sept – 3 Oct 2026 */
export function formatDateRange(startIso: string, endIso: string) {
  return shortDate.formatRange(new Date(startIso), new Date(endIso));
}
