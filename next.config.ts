import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Every page prerenders, so Vercel serves the whole store statically and
  // `next build` is the entire deployment story.
  reactStrictMode: true,
};

export default nextConfig;
