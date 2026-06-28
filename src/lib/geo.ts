// ─────────────────────────────────────────────────────────────────────────────
// Country helpers for IP-based personalization.
// The middleware reads Vercel's `x-vercel-ip-country` header and forwards it as
// `x-user-country`. The homepage (server component) reads it and personalizes
// the hero. Everything degrades gracefully to neutral copy when unknown.
// ─────────────────────────────────────────────────────────────────────────────

// Countries we cannot serve due to US sanctions/restrictions (ISO-3166 alpha-2).
export const RESTRICTED = new Set([
  "BI", "CF", "CG", "CD", "IR", "IQ", "KP", "LR", "SO", "SS", "SD", "SY", "YE", "ZW", "CU", "RU", "BY",
]);

// Friendly demonyms / phrasing tweaks for the biggest markets. Falls back to the
// country name from Intl.DisplayNames for everything else.
const NAME_OVERRIDES: Record<string, string> = {
  US: "the United States",
  GB: "the United Kingdom",
  AE: "the UAE",
  NL: "the Netherlands",
  PH: "the Philippines",
  DO: "the Dominican Republic",
  CZ: "the Czech Republic",
  KR: "South Korea",
  PK: "Pakistan",
  IN: "India",
};

export function flagEmoji(countryCode: string): string {
  if (!countryCode || countryCode.length !== 2) return "🌍";
  const cc = countryCode.toUpperCase();
  const A = 0x1f1e6;
  const first = cc.charCodeAt(0) - 65 + A;
  const second = cc.charCodeAt(1) - 65 + A;
  return String.fromCodePoint(first) + String.fromCodePoint(second);
}

export function countryName(countryCode: string): string {
  if (!countryCode) return "";
  const cc = countryCode.toUpperCase();
  if (NAME_OVERRIDES[cc]) return NAME_OVERRIDES[cc];
  try {
    const dn = new Intl.DisplayNames(["en"], { type: "region" });
    return dn.of(cc) || "";
  } catch {
    return "";
  }
}

export interface GeoInfo {
  code: string;
  name: string;
  flag: string;
  restricted: boolean;
  known: boolean;
}

export function resolveGeo(countryCode: string | null | undefined): GeoInfo {
  const code = (countryCode || "").toUpperCase();
  const name = countryName(code);
  return {
    code,
    name,
    flag: flagEmoji(code),
    restricted: RESTRICTED.has(code),
    known: Boolean(code && name),
  };
}
