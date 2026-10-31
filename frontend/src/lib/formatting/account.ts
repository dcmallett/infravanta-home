/** ••••7890 — never show full account numbers in summaries. */
export function maskAccountNumber(accountNumber: string) {
  return `••••${accountNumber.slice(-4)}`;
}
