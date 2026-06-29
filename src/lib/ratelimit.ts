// ─────────────────────────────────────────────────────────────────────────────
// Lightweight in-memory sliding-window rate limiter.
//
// This is a per-instance limiter: on serverless it bounds abuse per warm
// instance, which meaningfully slows scripted card-testing without any external
// infrastructure. For hard, cross-instance guarantees move this to Upstash /
// Vercel KV (`@upstash/ratelimit`) — the call site (`rateLimit(...)`) stays the
// same. Documented intentionally so the limitation is not mistaken for coverage.
// ─────────────────────────────────────────────────────────────────────────────

const buckets = new Map<string, number[]>();

export interface RateLimitResult {
  ok: boolean;
  /** Seconds the caller should wait before retrying (0 when allowed). */
  retryAfter: number;
}

export function rateLimit(key: string, limit: number, windowMs: number): RateLimitResult {
  const now = Date.now();
  const recent = (buckets.get(key) || []).filter((t) => now - t < windowMs);

  if (recent.length >= limit) {
    buckets.set(key, recent);
    const retryAfter = Math.ceil((windowMs - (now - recent[0])) / 1000);
    return { ok: false, retryAfter: Math.max(1, retryAfter) };
  }

  recent.push(now);
  buckets.set(key, recent);

  // Opportunistic cleanup so the map can't grow unbounded under heavy traffic.
  if (buckets.size > 5000) {
    for (const [k, stamps] of buckets) {
      if (stamps.every((t) => now - t >= windowMs)) buckets.delete(k);
    }
  }

  return { ok: true, retryAfter: 0 };
}
