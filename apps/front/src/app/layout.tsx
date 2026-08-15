import type { Metadata } from "next";
import { Geist } from "next/font/google";
import { cn } from "@repo/ui/utils";
import { buildMetadata } from "@/lib/seo";
import { JsonLd } from "@/components/json-ld";
import { organizationSchema, websiteSchema } from "@/lib/structured-data";
import "./globals.css";

const geist = Geist({
  subsets: ["latin"],
  variable: "--font-sans",
});

export async function generateMetadata(): Promise<Metadata> {
  return buildMetadata({
    siteName: "Client",
    title: "Client — Build what only you can build",
    description:
      "A clean, typed foundation for building focused SaaS products.",
    path: "/",
  });
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={cn("h-full antialiased dark", geist.variable)}>
      <body className="min-h-full flex flex-col font-sans">
        <JsonLd data={organizationSchema("Client")} />
        <JsonLd data={websiteSchema("Client")} />
        {children}
      </body>
    </html>
  );
}
