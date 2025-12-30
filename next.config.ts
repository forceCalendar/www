import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* Optimize for production */
  reactStrictMode: true,
  swcMinify: true,
};

export default nextConfig;
