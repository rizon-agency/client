"use client";

import { useState } from "react";
import Link from "next/link";
import { Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { billingPlans, type BillingInterval } from "@repo/constants/billing";

interface PricingProps {
  appUrl: string;
}

const formatPrice = (amount: number, currency: string) =>
  new Intl.NumberFormat("en-US", {
    style: "currency",
    currency,
    maximumFractionDigits: 0,
  }).format(amount / 100);

const yearlyDiscount = (monthly: number, yearly: number) =>
  Math.round((1 - yearly / (monthly * 12)) * 100);

export const Pricing = ({ appUrl }: PricingProps) => {
  const [interval, setInterval] = useState<BillingInterval>("monthly");

  return (
    <section id="pricing" className="mx-auto max-w-6xl px-6 py-24">
      <div className="text-center">
        <p className="text-sm font-medium text-primary">Pricing</p>
        <h2 className="mt-3 text-3xl font-semibold tracking-tight sm:text-4xl">
          Simple, transparent pricing.
        </h2>
        <p className="mt-4 text-muted-foreground">
          One plan for every stage. No hidden fees.
        </p>

        <div className="mt-8 inline-flex items-center gap-1 rounded-full border border-border bg-muted p-1">
          <button
            onClick={() => setInterval("monthly")}
            className={`rounded-full px-5 py-2 text-sm font-medium transition-colors ${
              interval === "monthly"
                ? "bg-background text-foreground shadow-sm"
                : "text-muted-foreground hover:text-foreground"
            }`}
          >
            Monthly
          </button>
          <button
            onClick={() => setInterval("yearly")}
            className={`flex items-center gap-2 rounded-full px-5 py-2 text-sm font-medium transition-colors ${
              interval === "yearly"
                ? "bg-background text-foreground shadow-sm"
                : "text-muted-foreground hover:text-foreground"
            }`}
          >
            Yearly
            <span className="rounded-full bg-primary px-2 py-0.5 text-xs font-semibold text-primary-foreground">
              Save{" "}
              {yearlyDiscount(
                billingPlans[1]!.prices.monthly.amount,
                billingPlans[1]!.prices.yearly.amount,
              )}
              %
            </span>
          </button>
        </div>
      </div>

      <div className="mt-12 grid gap-4 sm:grid-cols-3">
        {billingPlans.map((plan, index) => {
          const featured = index === 1;
          const price = plan.prices[interval];

          return (
            <div
              key={plan.key}
              className={`relative flex flex-col rounded-3xl p-8 ${
                featured
                  ? "bg-foreground text-background shadow-2xl shadow-foreground/20"
                  : "border border-border bg-card"
              }`}
            >
              {featured && (
                <span className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-primary px-4 py-1 text-xs font-semibold text-primary-foreground">
                  Most popular
                </span>
              )}

              <div>
                <p
                  className={`text-sm font-medium ${featured ? "text-background/60" : "text-muted-foreground"}`}
                >
                  {plan.name}
                </p>
                <div className="mt-4 flex items-end gap-1">
                  <span className="text-5xl font-semibold tracking-tight">
                    {formatPrice(price.amount, price.currency)}
                  </span>
                  <span
                    className={`mb-1.5 text-sm ${featured ? "text-background/60" : "text-muted-foreground"}`}
                  >
                    /{interval === "monthly" ? "mo" : "yr"}
                  </span>
                </div>
                {interval === "yearly" && (
                  <p
                    className={`mt-1 text-xs ${featured ? "text-background/50" : "text-muted-foreground"}`}
                  >
                    {formatPrice(plan.prices.monthly.amount, price.currency)}/mo
                    billed annually
                  </p>
                )}
                <p
                  className={`mt-4 text-sm leading-relaxed ${featured ? "text-background/70" : "text-muted-foreground"}`}
                >
                  {plan.description}
                </p>
              </div>

              <ul className="mt-8 space-y-3 flex-1">
                {plan.features.map((feature) => (
                  <li key={feature} className="flex items-center gap-3 text-sm">
                    <Check
                      className={`size-4 shrink-0 ${featured ? "text-background/70" : "text-primary"}`}
                    />
                    <span className={featured ? "text-background/80" : ""}>
                      {feature}
                    </span>
                  </li>
                ))}
              </ul>

              <div className="mt-8">
                <Button
                  asChild
                  className={`w-full ${
                    featured
                      ? "bg-background text-foreground hover:bg-background/90"
                      : ""
                  }`}
                  variant={featured ? "default" : "outline"}
                >
                  <Link href={appUrl}>Get started</Link>
                </Button>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};
