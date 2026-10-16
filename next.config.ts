import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Extra dev hosts (comma-separated), e.g. a preview proxy domain.
  allowedDevOrigins: process.env.NEXT_ALLOWED_DEV_ORIGINS?.split(",") ?? [],
  /* config options here */
  reactCompiler: true,
};

export default nextConfig;
