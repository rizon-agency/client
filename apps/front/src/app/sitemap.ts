import type { MetadataRoute } from "next";
import { env } from "@/config/env";

export const dynamic = "force-static";

const paths = ["/", "/blog", "/blog/cats"];

export default function sitemap(): MetadataRoute.Sitemap {
  return paths.map((path) => ({
    url: new URL(path, env.SITE_URL).toString(),
  }));
}
