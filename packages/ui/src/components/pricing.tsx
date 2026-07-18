"use client";

import { Check } from "lucide-react";
import { useState, type ReactNode } from "react";
import { cn } from "@repo/ui/utils";

export type PricingInterval = "monthly" | "yearly";

export interface PricingPlan {
  description: string;
  features: readonly string[];
  key: string;
  name: string;
  prices: Record<PricingInterval, { amount: number; currency: string }>;
}

interface PricingProps<Plan extends PricingPlan> {
  className?: string;
  description?: string;
  featuredPlanKey?: Plan["key"];
  id?: string;
  plans: readonly Plan[];
  renderAction: (input: {
    billingInterval: PricingInterval;
    featured: boolean;
    plan: Plan;
  }) => ReactNode;
  title?: string;
}

const formatPrice = (amount: number, currency: string) =>
  new Intl.NumberFormat("en-US", {
    currency,
    maximumFractionDigits: 0,
    style: "currency",
  }).format(amount / 100);

const yearlyDiscount = (monthly: number, yearly: number) =>
  Math.round((1 - yearly / (monthly * 12)) * 100);

export function Pricing<Plan extends PricingPlan>({
  className,
  description,
  featuredPlanKey,
  id,
  plans,
  renderAction,
  title,
}: PricingProps<Plan>) {
  const [billingInterval, setBillingInterval] =
    useState<PricingInterval>("monthly");
  const featuredPlan =
    plans.find((plan) => plan.key === featuredPlanKey) ?? plans[1];
  const discount = featuredPlan
    ? yearlyDiscount(
        featuredPlan.prices.monthly.amount,
        featuredPlan.prices.yearly.amount,
      )
    : null;

  return (
    <section id={id} className={className}>
      {(title || description) && (
        <div className="text-center">
          {title && (
            <>
              <p className="text-sm font-medium text-primary">Pricing</p>
              <h2 className="mt-3 text-3xl font-semibold tracking-tight sm:text-4xl">
                {title}
              </h2>
            </>
          )}
          {description && (
            <p className="mt-4 text-muted-foreground">{description}</p>
          )}

          <IntervalToggle
            billingInterval={billingInterval}
            discount={discount}
            onChange={setBillingInterval}
          />
        </div>
      )}

      {!title && !description && (
        <div className="mb-8 text-center">
          <IntervalToggle
            billingInterval={billingInterval}
            discount={discount}
            onChange={setBillingInterval}
          />
        </div>
      )}

      <div className="mt-12 grid gap-4 sm:grid-cols-3">
        {plans.map((plan, index) => {
          const featured = featuredPlanKey
            ? plan.key === featuredPlanKey
            : index === 1;
          const price = plan.prices[billingInterval];

          return (
            <div
              key={plan.key}
              className={cn(
                "relative flex flex-col rounded-3xl p-8",
                featured
                  ? "bg-foreground text-background shadow-2xl shadow-foreground/20"
                  : "border border-border bg-card",
              )}
            >
              {featured && (
                <span className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-primary px-4 py-1 text-xs font-semibold text-primary-foreground">
                  Most popular
                </span>
              )}

              <div>
                <p
                  className={cn(
                    "text-sm font-medium",
                    featured ? "text-background/60" : "text-muted-foreground",
                  )}
                >
                  {plan.name}
                </p>
                <div className="mt-4 flex items-end gap-1">
                  <span className="text-5xl font-semibold tracking-tight">
                    {formatPrice(price.amount, price.currency)}
                  </span>
                  <span
                    className={cn(
                      "mb-1.5 text-sm",
                      featured ? "text-background/60" : "text-muted-foreground",
                    )}
                  >
                    /{billingInterval === "monthly" ? "mo" : "yr"}
                  </span>
                </div>
                {billingInterval === "yearly" && (
                  <p
                    className={cn(
                      "mt-1 text-xs",
                      featured ? "text-background/50" : "text-muted-foreground",
                    )}
                  >
                    {formatPrice(plan.prices.monthly.amount, price.currency)}/mo
                    billed annually
                  </p>
                )}
                <p
                  className={cn(
                    "mt-4 text-sm leading-relaxed",
                    featured ? "text-background/70" : "text-muted-foreground",
                  )}
                >
                  {plan.description}
                </p>
              </div>

              <ul className="mt-8 flex-1 space-y-3">
                {plan.features.map((feature) => (
                  <li key={feature} className="flex items-center gap-3 text-sm">
                    <Check
                      className={cn(
                        "size-4 shrink-0",
                        featured ? "text-background/70" : "text-primary",
                      )}
                    />
                    <span
                      className={featured ? "text-background/80" : undefined}
                    >
                      {feature}
                    </span>
                  </li>
                ))}
              </ul>

              <div className="mt-8">
                {renderAction({ billingInterval, featured, plan })}
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}

interface IntervalToggleProps {
  billingInterval: PricingInterval;
  discount: number | null;
  onChange: (billingInterval: PricingInterval) => void;
}

const IntervalToggle = ({
  billingInterval,
  discount,
  onChange,
}: IntervalToggleProps) => (
  <div className="mt-8 inline-flex items-center gap-1 rounded-full border border-border bg-muted p-1">
    <button
      className={cn(
        "rounded-full px-5 py-2 text-sm font-medium transition-colors",
        billingInterval === "monthly"
          ? "bg-background text-foreground shadow-sm"
          : "text-muted-foreground hover:text-foreground",
      )}
      onClick={() => onChange("monthly")}
    >
      Monthly
    </button>
    <button
      className={cn(
        "flex items-center gap-2 rounded-full px-5 py-2 text-sm font-medium transition-colors",
        billingInterval === "yearly"
          ? "bg-background text-foreground shadow-sm"
          : "text-muted-foreground hover:text-foreground",
      )}
      onClick={() => onChange("yearly")}
    >
      Yearly
      {discount !== null && (
        <span className="rounded-full bg-primary px-2 py-0.5 text-xs font-semibold text-primary-foreground">
          Save {discount}%
        </span>
      )}
    </button>
  </div>
);
