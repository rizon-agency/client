export type BillingInterval = "monthly" | "yearly";
export type BillingPlanKey = "starter" | "pro" | "business";

export interface BillingPlanDefinition {
  description: string;
  features: string[];
  key: BillingPlanKey;
  name: string;
  order: number;
  prices: Record<BillingInterval, { amount: number; currency: string }>;
}

export const billingIntervals: readonly BillingInterval[] = [
  "monthly",
  "yearly",
];

export const billingPlans: readonly BillingPlanDefinition[] = [
  {
    description: "A focused place to begin.",
    features: [
      "Everything you need to launch",
      "Unlimited projects",
      "Priority support",
    ],
    key: "starter",
    name: "Starter",
    order: 1,
    prices: {
      monthly: { amount: 1_000, currency: "usd" },
      yearly: { amount: 10_000, currency: "usd" },
    },
  },
  {
    description: "Built for teams and larger operations.",
    features: [
      "Everything you need to launch",
      "Unlimited projects",
      "Priority support",
    ],
    key: "pro",
    name: "Pro",
    order: 2,
    prices: {
      monthly: { amount: 1_500, currency: "usd" },
      yearly: { amount: 15_000, currency: "usd" },
    },
  },
  {
    description: "More room for your growing workflow.",
    features: [
      "Everything you need to launch",
      "Unlimited projects",
      "Priority support",
    ],
    key: "business",
    name: "Business",
    order: 3,
    prices: {
      monthly: { amount: 3_000, currency: "usd" },
      yearly: { amount: 30_000, currency: "usd" },
    },
  },
];

export const stripePriceIds: Record<
  BillingPlanKey,
  Record<BillingInterval, string>
> = {
  starter: {
    monthly: "price_1TuHqHInV3KLo0c7LutflX92",
    yearly: "price_1TuIMHInV3KLo0c7NPI2FNgm",
  },
  pro: {
    monthly: "price_1TuHqSInV3KLo0c779ybsa9r",
    yearly: "price_1TuIM4InV3KLo0c7mhbIdwhE",
  },
  business: {
    monthly: "price_1TuHqgInV3KLo0c7vLa9cxWC",
    yearly: "price_1TuILvInV3KLo0c7KC5Vrror",
  },
};

export const getBillingPlan = (planKey: BillingPlanKey) =>
  billingPlans.find((plan) => plan.key === planKey);

export const isBillingPlanKey = (value: string): value is BillingPlanKey =>
  value === "starter" || value === "pro" || value === "business";

export const getStripePriceId = (
  planKey: BillingPlanKey,
  billingInterval: BillingInterval,
) => stripePriceIds[planKey][billingInterval];

export const getBillingPrice = (priceId: string) => {
  for (const plan of billingPlans) {
    for (const billingInterval of billingIntervals) {
      if (stripePriceIds[plan.key][billingInterval] === priceId) {
        return { billingInterval, planKey: plan.key };
      }
    }
  }

  return null;
};
