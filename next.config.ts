import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* Disable experimental features for stability */
  experimental: {
    turbo: undefined,
  },
  /* Optimize for production */
  reactStrictMode: true,
  swcMinify: true,
};

export default nextConfig;
