"use client";

import { ProgressProvider } from "@bprogress/next/app";
import type { ReactNode } from "react";
import Analytics from "@/components/analytics";
import { TailwindIndicator } from "@/components/tailwind-indicator";
import { ThemeProvider } from "@/components/theme-provider";
import { Toaster } from "@repo/ui/components/ui/sonner";
import { TooltipProvider } from "@repo/ui/components/ui/tooltip";

export function Provider({
  children,
}: {
  children: ReactNode;
}): React.ReactElement {
  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="system"
      disableTransitionOnChange
      enableSystem
    >
      <ProgressProvider
        color="var(--color-primary)"
        delay={1000}
        height="2px"
        options={{
          showSpinner: false,
        }}
        shallowRouting
        startOnLoad
        stopDelay={1000}
      >
        <TooltipProvider>{children}</TooltipProvider>
      </ProgressProvider>
      <Analytics />
      <Toaster />
      <TailwindIndicator />
    </ThemeProvider>
  );
}
