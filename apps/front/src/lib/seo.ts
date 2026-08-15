import type { Metadata } from "next";
import { env } from "@/config/env";

interface BuildMetadataInput {
  siteName: string;
  title: string;
  description: string;
  path?: string;
}

const OG_IMAGE = "/og.png";

export const buildMetadata = ({
  siteName,
  title,
  description,
  path = "/",
}: BuildMetadataInput): Metadata => {
  const canonical = path;

  return {
    metadataBase: new URL(env.SITE_URL),
    title,
    description,
    alternates: {
      canonical,
    },
    openGraph: {
      type: "website",
      siteName,
      locale: "en",
      title,
      description,
      url: canonical,
      images: [OG_IMAGE],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [OG_IMAGE],
    },
  };
};
