// ─────────────────────────────────────────────────────────────────────────────
// Order pricing — the single source of truth used by BOTH the checkout UI and
// the server API route. The server recomputes the total from this on every
// charge, so the amount can never be tampered with in the browser.
// ─────────────────────────────────────────────────────────────────────────────

import { pricing, addOns, type ServiceKey, type AddOn } from "./content";
import { STATE_FEES } from "./states";

export const SLUG_TO_KEY: Record<string, ServiceKey> = {
  itin: "itin",
  llc: "llc",
  "llc-ein-itin": "bundle",
};

export interface OrderLine {
  id: string;
  label: string;
  amount: number;
  recurring?: boolean;
}

export interface Order {
  lines: OrderLine[];
  total: number;
  serviceKey: ServiceKey;
  hasStateFee: boolean;
}

export function baseFor(serviceKey: ServiceKey) {
  if (serviceKey === "itin")
    return { label: "ITIN Application", amount: pricing.itin.price, hasStateFee: false };
  if (serviceKey === "llc")
    return {
      label: "LLC + EIN + Business Address",
      amount: pricing.llc.price,
      hasStateFee: true,
    };
  return {
    label: "LLC + EIN + ITIN — Complete",
    amount: pricing.bundle.price,
    hasStateFee: true,
  };
}

export function addOnsFor(serviceKey: ServiceKey): AddOn[] {
  return addOns.filter((a) => a.appliesTo.includes(serviceKey));
}

export function computeOrder(params: {
  serviceSlug: string;
  stateName?: string;
  addOnIds?: string[];
}): Order {
  const serviceKey: ServiceKey = SLUG_TO_KEY[params.serviceSlug] ?? "bundle";
  const base = baseFor(serviceKey);

  const lines: OrderLine[] = [{ id: "base", label: base.label, amount: base.amount }];

  if (base.hasStateFee && params.stateName) {
    const st = STATE_FEES.find((s) => s.name === params.stateName);
    if (st) {
      lines.push({
        id: `state:${st.name}`,
        label: `${st.name} state filing fee`,
        amount: st.fee,
      });
    }
  }

  const valid = addOnsFor(serviceKey);
  for (const id of params.addOnIds ?? []) {
    const a = valid.find((x) => x.id === id);
    if (a) lines.push({ id: `addon:${a.id}`, label: a.name, amount: a.price });
  }

  const total = lines.reduce((s, l) => s + l.amount, 0);
  return { lines, total, serviceKey, hasStateFee: base.hasStateFee };
}

// Curated country list for billing (ISO-3166 alpha-2) — covers the markets this
// service serves; falls back to "Other" for anything not listed.
export const COUNTRIES: { code: string; name: string }[] = [
  { code: "PK", name: "Pakistan" },
  { code: "IN", name: "India" },
  { code: "BD", name: "Bangladesh" },
  { code: "NG", name: "Nigeria" },
  { code: "EG", name: "Egypt" },
  { code: "AE", name: "United Arab Emirates" },
  { code: "SA", name: "Saudi Arabia" },
  { code: "TR", name: "Turkey" },
  { code: "GB", name: "United Kingdom" },
  { code: "CA", name: "Canada" },
  { code: "US", name: "United States" },
  { code: "AU", name: "Australia" },
  { code: "DE", name: "Germany" },
  { code: "FR", name: "France" },
  { code: "ES", name: "Spain" },
  { code: "IT", name: "Italy" },
  { code: "NL", name: "Netherlands" },
  { code: "PT", name: "Portugal" },
  { code: "BR", name: "Brazil" },
  { code: "MX", name: "Mexico" },
  { code: "AR", name: "Argentina" },
  { code: "CO", name: "Colombia" },
  { code: "PH", name: "Philippines" },
  { code: "ID", name: "Indonesia" },
  { code: "MY", name: "Malaysia" },
  { code: "SG", name: "Singapore" },
  { code: "VN", name: "Vietnam" },
  { code: "TH", name: "Thailand" },
  { code: "ZA", name: "South Africa" },
  { code: "KE", name: "Kenya" },
  { code: "GH", name: "Ghana" },
  { code: "MA", name: "Morocco" },
  { code: "PL", name: "Poland" },
  { code: "RO", name: "Romania" },
  { code: "UA", name: "Ukraine" },
  { code: "JP", name: "Japan" },
  { code: "KR", name: "South Korea" },
  { code: "CN", name: "China" },
  { code: "HK", name: "Hong Kong" },
  { code: "IE", name: "Ireland" },
  { code: "NZ", name: "New Zealand" },
  { code: "QA", name: "Qatar" },
  { code: "KW", name: "Kuwait" },
  { code: "OM", name: "Oman" },
  { code: "BH", name: "Bahrain" },
  { code: "JO", name: "Jordan" },
  { code: "LK", name: "Sri Lanka" },
  { code: "NP", name: "Nepal" },
  { code: "OTHER", name: "Other" },
];
