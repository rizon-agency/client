import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import bundleAnalyzer from "@next/bundle-analyzer";
import { createMDX } from "fumadocs-mdx/next";
import type { NextConfig } from "next";

async function createNextConfig(): Promise<NextConfig> {
  const { createJiti } = await import("jiti");
  const jiti = createJiti(fileURLToPath(import.meta.url));

  const { env } = await jiti.import<typeof import("./src/env")>("./src/env");

  const nextConfig: NextConfig = {
    turbopack: {
      root: join(dirname(fileURLToPath(import.meta.url)), "..", ".."),
    },
    env: {
      NEXT_PUBLIC_APP_URL: env.NEXT_PUBLIC_APP_URL,
    },
    reactStrictMode: true,
    poweredByHeader: false,
    productionBrowserSourceMaps: process.env.SOURCE_MAPS === "true",
    devIndicators: false,
    logging: {
      fetches: {
        fullUrl: true,
      },
    },
    images: {
      qualities: [100, 75, 85, 95],
      remotePatterns: [
        {
          protocol: "https",
          hostname: "avatars.githubusercontent.com",
          port: "",
        },
        {
          protocol: "https",
          hostname: "fumadocs.dev",
          port: "",
        },
      ],
    },
    typescript: {
      ignoreBuildErrors: true,
    },
    serverExternalPackages: [
      "ts-morph",
      "typescript",
      "oxc-transform",
      "twoslash",
      "twoslash-protocol",
      "shiki",
      "@takumi-rs/image-response",
    ],
  };

  return nextConfig;
}

const bundleAnalyzerPlugin = bundleAnalyzer({
  enabled: process.env.ANALYZE === "true",
});

const mdxPlugin = createMDX();

const NextApp = async () => {
  const nextConfig = await createNextConfig();
  const plugins = [bundleAnalyzerPlugin, mdxPlugin];
  return plugins.reduce((config, plugin) => plugin(config), nextConfig);
};

export default NextApp;
