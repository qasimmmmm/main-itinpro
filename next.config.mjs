// Content-Security-Policy. Locks down the high-value directives (frame-src,
// connect-src, object-src, base-uri, form-action) to defend the card-entry flow
// against script-injection / iframe-overlay skimming, while allowlisting the
// third parties the app legitimately loads: the NMI gateway (Collect.js + its
// card iframes) and Google Ads/gtag. 'unsafe-inline' is kept for scripts because
// Next.js and gtag inject inline scripts without a nonce; the meaningful
// restrictions are on where scripts/frames/connections may originate.
const csp = [
  "default-src 'self'",
  "base-uri 'self'",
  "object-src 'none'",
  "frame-ancestors 'self'",
  "form-action 'self'",
  "script-src 'self' 'unsafe-inline' https://secure.nmi.com https://www.googletagmanager.com https://www.google-analytics.com https://googleads.g.doubleclick.net https://www.googleadservices.com",
  "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
  "font-src 'self' https://fonts.gstatic.com data:",
  "img-src 'self' data: https:",
  "frame-src https://secure.nmi.com https://www.googletagmanager.com https://td.doubleclick.net https://bid.g.doubleclick.net",
  "connect-src 'self' https://secure.nmi.com https://www.google-analytics.com https://region1.google-analytics.com https://www.googletagmanager.com https://googleads.g.doubleclick.net",
].join("; ");

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  eslint: {
    // Don't fail Vercel production builds on lint warnings.
    ignoreDuringBuilds: true,
  },
  poweredByHeader: false,
  async headers() {
    return [
      {
        source: "/:path*",
        headers: [
          { key: "Content-Security-Policy", value: csp },
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          { key: "X-Frame-Options", value: "SAMEORIGIN" },
          { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=()" },
          {
            key: "Strict-Transport-Security",
            value: "max-age=63072000; includeSubDomains; preload",
          },
        ],
      },
    ];
  },
};

export default nextConfig;
