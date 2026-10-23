const gbp = new Intl.NumberFormat("en-GB", {
  style: "currency",
  currency: "GBP",
  minimumFractionDigits: 2,
  maximumFractionDigits: 2,
});

const gbpWhole = new Intl.NumberFormat("en-GB", {
  style: "currency",
  currency: "GBP",
  maximumFractionDigits: 0,
});

/** £1,245.50 */
export function formatCurrency(amount: number) {
  return gbp.format(amount);
}

/** £1,246 — for estimates and ranges where pennies imply false precision. */
export function formatCurrencyWhole(amount: number) {
  return gbpWhole.format(amount);
}

/** £120–£260 */
export function formatCurrencyRange(min: number, max: number) {
  return `${formatCurrencyWhole(min)}–${formatCurrencyWhole(max)}`;
}
