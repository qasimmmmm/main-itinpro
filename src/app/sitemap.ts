import type { MetadataRoute } from "next";
import { company } from "@/lib/content";

// Stable content date. Bump this when site content meaningfully changes — using
// a fixed date (instead of `new Date()`) keeps every page's <lastmod> from
// churning on every deploy, which would otherwise train crawlers to ignore it.
const LAST_CONTENT_UPDATE = new Date("2026-06-29");

export default function sitemap(): MetadataRoute.Sitemap {
  const base = company.url;
  const now = LAST_CONTENT_UPDATE;

  const routes = [
    { path: "/", priority: 1.0, changeFrequency: "weekly" as const },
    { path: "/services/llc-ein-itin", priority: 0.9, changeFrequency: "monthly" as const },
    { path: "/services/llc", priority: 0.9, changeFrequency: "monthly" as const },
    { path: "/services/itin", priority: 0.9, changeFrequency: "monthly" as const },
    { path: "/services/ein", priority: 0.8, changeFrequency: "monthly" as const },
    { path: "/pricing", priority: 0.9, changeFrequency: "monthly" as const },
    { path: "/about", priority: 0.6, changeFrequency: "yearly" as const },
    { path: "/faq", priority: 0.6, changeFrequency: "monthly" as const },
    { path: "/contact", priority: 0.6, changeFrequency: "yearly" as const },
    { path: "/apply", priority: 0.8, changeFrequency: "monthly" as const },
    { path: "/privacy-policy", priority: 0.3, changeFrequency: "yearly" as const },
    { path: "/terms", priority: 0.3, changeFrequency: "yearly" as const },
    { path: "/refund-policy", priority: 0.3, changeFrequency: "yearly" as const },
    { path: "/disclaimer", priority: 0.3, changeFrequency: "yearly" as const },
  ];

  return routes.map((r) => ({
    url: `${base}${r.path}`,
    lastModified: now,
    changeFrequency: r.changeFrequency,
    priority: r.priority,
  }));
}
