"use client";

// Client-side geo personalization islands. These let the homepage stay a fully
// static, cached route (no per-request `headers()` / force-dynamic) while still
// personalizing the hero. They read the `user-country` cookie the middleware
// sets and default to neutral copy, so the server HTML and first client render
// always match (no hydration mismatch) and there is no SEO cost on the <h1>.

import { useEffect, useState } from "react";
import { resolveGeo, type GeoInfo } from "@/lib/geo";

function readCountryCookie(): string {
  if (typeof document === "undefined") return "";
  const m = document.cookie.match(/(?:^|;\s*)user-country=([^;]+)/);
  return m ? decodeURIComponent(m[1]) : "";
}

function useGeo(): GeoInfo {
  const [geo, setGeo] = useState<GeoInfo>(() => resolveGeo(""));
  useEffect(() => {
    setGeo(resolveGeo(readCountryCookie()));
  }, []);
  return geo;
}

export function GeoPlace() {
  const geo = useGeo();
  return <>{geo.known && !geo.restricted ? `from ${geo.name}` : "from anywhere"}</>;
}

export function GeoFlag() {
  const geo = useGeo();
  return <>{geo.known ? geo.flag : "🌍"}</>;
}

export function GeoRestrictedNote() {
  const geo = useGeo();
  if (!geo.restricted) return null;
  return (
    <div className="mx-auto mt-6 max-w-xl rounded-xl border border-gold/30 bg-gold/10 p-4 text-center text-sm text-gold-soft">
      Due to US sanctions we may be unable to serve your country directly. Message us first and
      we&apos;ll confirm your eligibility before you pay.
    </div>
  );
}
