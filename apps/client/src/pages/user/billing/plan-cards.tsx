import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Spinner } from "@/components/ui/spinner";
import { Check } from "lucide-react";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import {
  billingPlans,
  getBillingPlan,
  isBillingPlanKey,
  type BillingInterval,
  type BillingPlanKey,
} from "@repo/constants/billing";
import { useState } from "react";

interface Subscription {
  billingInterval: string;
  cancelAtPeriodEnd: boolean;
  planKey: string;
  scheduledBillingInterval: string | null;
  scheduledPlanKey: string | null;
}

interface PlanCardsProps {
  isAnyMutating: boolean;
  isChangePending: boolean;
  isCheckoutPending: boolean;
  onChange: (input: {
    billingInterval: BillingInterval;
    planKey: BillingPlanKey;
  }) => void;
  onCheckout: (input: {
    billingInterval: BillingInterval;
    planKey: BillingPlanKey;
  }) => void;
  pendingPlanKey: BillingPlanKey | null;
  subscription: Subscription | null;
}

const formatPrice = (amount: number, currency: string) =>
  new Intl.NumberFormat(undefined, { currency, style: "currency" }).format(
    amount / 100,
  );

export const PlanCards = ({
  isAnyMutating,
  isChangePending,
  isCheckoutPending,
  onChange,
  onCheckout,
  pendingPlanKey,
  subscription,
}: PlanCardsProps) => {
  const [billingInterval, setBillingInterval] =
    useState<BillingInterval>("monthly");

  const getPlanAction = (planKey: BillingPlanKey): string => {
    if (!subscription) {
      return `Choose ${billingPlans.find((p) => p.key === planKey)?.name}`;
    }
    const currentPlanKey = isBillingPlanKey(subscription.planKey)
      ? subscription.planKey
      : null;
    const currentPlan = currentPlanKey ? getBillingPlan(currentPlanKey) : null;
    const targetPlan = getBillingPlan(planKey);
    if (!currentPlan || !targetPlan) return "Switch plan";
    if (targetPlan.order > currentPlan.order)
      return `Upgrade to ${targetPlan.name}`;
    if (targetPlan.order < currentPlan.order)
      return `Downgrade to ${targetPlan.name}`;
    return billingInterval === "yearly"
      ? "Switch to yearly"
      : "Switch to monthly";
  };

  const getChangeTiming = (
    planKey: BillingPlanKey,
  ): "immediate" | "period_end" | null => {
    if (!subscription) return null;
    const currentPlanKey = isBillingPlanKey(subscription.planKey)
      ? subscription.planKey
      : null;
    const currentPlan = currentPlanKey ? getBillingPlan(currentPlanKey) : null;
    const targetPlan = getBillingPlan(planKey);
    if (!currentPlan || !targetPlan || targetPlan.order === currentPlan.order)
      return null;
    return targetPlan.order > currentPlan.order ? "immediate" : "period_end";
  };

  return (
    <>
      <ToggleGroup
        onValueChange={(value) => {
          if (value === "monthly" || value === "yearly")
            setBillingInterval(value);
        }}
        type="single"
        value={billingInterval}
        variant="outline"
      >
        <ToggleGroupItem value="monthly">Monthly</ToggleGroupItem>
        <ToggleGroupItem value="yearly">Yearly</ToggleGroupItem>
      </ToggleGroup>

      <div className="grid gap-4 lg:grid-cols-3">
        {billingPlans.map((plan) => {
          const isCurrent =
            subscription?.planKey === plan.key &&
            subscription.billingInterval === billingInterval;
          const isScheduled =
            subscription?.scheduledPlanKey === plan.key &&
            subscription.scheduledBillingInterval === billingInterval;
          const timing = getChangeTiming(plan.key);
          const price = plan.prices[billingInterval];
          const isThisPlanPending =
            pendingPlanKey === plan.key &&
            (isCheckoutPending || isChangePending);

          return (
            <Card key={plan.key}>
              <CardHeader>
                <CardTitle>{plan.name}</CardTitle>
                <CardDescription>{plan.description}</CardDescription>
                <CardDescription>
                  {formatPrice(price.amount, price.currency)} /{" "}
                  {billingInterval}
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <ul className="space-y-2">
                  {plan.features.map((feature) => (
                    <li
                      key={feature}
                      className="text-muted-foreground flex items-center gap-2 text-sm"
                    >
                      <Check className="text-primary size-4 shrink-0" />
                      {feature}
                    </li>
                  ))}
                </ul>
                <div className="space-y-1">
                  <Button
                    disabled={isCurrent || isScheduled || isAnyMutating}
                    onClick={() => {
                      if (subscription) {
                        onChange({ billingInterval, planKey: plan.key });
                      } else {
                        onCheckout({ billingInterval, planKey: plan.key });
                      }
                    }}
                  >
                    {isThisPlanPending && <Spinner />}
                    {isCurrent
                      ? "Current plan"
                      : isScheduled
                        ? "Scheduled"
                        : getPlanAction(plan.key)}
                  </Button>
                  {timing && !isCurrent && !isScheduled && (
                    <p className="text-muted-foreground text-xs">
                      {timing === "immediate"
                        ? "Charged immediately, prorated."
                        : "Takes effect at next renewal."}
                    </p>
                  )}
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </>
  );
};
