// ─────────────────────────────────────────────────────────────────────────────
// Money helpers. All prices in this codebase are whole-dollar today, but routing
// every sum/format through here removes the classic floating-point money risk the
// moment a fractional price (e.g. a $49.50 add-on) is ever introduced.
// ─────────────────────────────────────────────────────────────────────────────

/** Round to whole cents, killing FP drift like 0.1 + 0.2 = 0.30000000000000004. */
export function roundMoney(n: number): number {
  return Math.round((n + Number.EPSILON) * 100) / 100;
}

/**
 * Format a USD amount for display. Whole dollars render without cents ("$298")
 * to match the existing design; fractional amounts render with two decimals
 * ("$49.50") so nothing ever shows a ragged value.
 */
export function formatUSD(n: number): string {
  const rounded = roundMoney(n);
  return Number.isInteger(rounded) ? `$${rounded}` : `$${rounded.toFixed(2)}`;
}
