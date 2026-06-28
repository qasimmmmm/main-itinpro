/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  eslint: {
    // Don't fail Vercel production builds on lint warnings.
    ignoreDuringBuilds: true,
  },
  poweredByHeader: false,
};

export default nextConfig;
