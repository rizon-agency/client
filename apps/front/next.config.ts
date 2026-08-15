import type { NextConfig } from "next";
import { env } from "./src/config/env";

const nextConfig: NextConfig = {
  output: "export",
  trailingSlash: true,
  transpilePackages: ["@repo/ui"],
  env: {
    NEXT_PUBLIC_SENTRY_DSN: env.NEXT_PUBLIC_SENTRY_DSN,
  },
};

export default nextConfig;
