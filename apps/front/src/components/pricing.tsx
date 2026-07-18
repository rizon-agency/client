"use client";

import Link from "next/link";
import { billingPlans } from "@repo/constants/billing";
import { Pricing as PricingSection } from "@repo/ui/components/pricing";
import { Button } from "@repo/ui/components/ui/button";
import { cn } from "@repo/ui/utils";

interface PricingProps {
  appUrl: string;
}

export const Pricing = ({ appUrl }: PricingProps) => (
  <PricingSection
    className="mx-auto max-w-6xl px-6 py-24"
    description="One plan for every stage. No hidden fees."
    id="pricing"
    plans={billingPlans}
    renderAction={({ featured }) => (
      <Button
        asChild
        className={cn(
          "w-full",
          featured && "bg-background text-foreground hover:bg-background/90",
        )}
        variant={featured ? "default" : "outline"}
      >
        <Link href={appUrl}>Get started</Link>
      </Button>
    )}
    title="Simple, transparent pricing."
  />
);
