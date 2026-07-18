import { api } from "@/api";
import { Spinner } from "@repo/ui/components/ui/spinner";
import { onError } from "@/lib/base-api";
import type { BillingInterval, BillingPlanKey } from "@repo/constants/billing";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { CurrentPlan } from "./current-plan";
import { PlanCards } from "./plan-cards";

export const Billing = () => {
  const queryClient = useQueryClient();

  const subscription = useQuery({
    queryKey: ["billing", "subscription"],
    queryFn: () => api.billing.subscription(),
  });

  const invalidateBilling = async () =>
    await queryClient.invalidateQueries({ queryKey: ["billing"] });

  const checkout = useMutation({
    mutationFn: (input: {
      billingInterval: BillingInterval;
      planKey: BillingPlanKey;
    }) => api.billing.checkout(input),
    onError,
    onSuccess: ({ url }) => window.location.assign(url),
  });

  const change = useMutation({
    mutationFn: (input: {
      billingInterval: BillingInterval;
      planKey: BillingPlanKey;
    }) => api.billing.change(input),
    onError,
    onSuccess: invalidateBilling,
  });

  const cancel = useMutation({
    mutationFn: () => api.billing.cancel(),
    onError,
    onSuccess: invalidateBilling,
  });

  const resume = useMutation({
    mutationFn: () => api.billing.resume(),
    onError,
    onSuccess: invalidateBilling,
  });

  const portal = useMutation({
    mutationFn: () => api.billing.portal(),
    onError,
    onSuccess: ({ url }) => window.location.assign(url),
  });

  if (subscription.isPending) return <Spinner />;
  if (subscription.isError) throw subscription.error;

  const current = subscription.data.subscription;
  const isAnyMutating =
    checkout.isPending ||
    change.isPending ||
    cancel.isPending ||
    resume.isPending ||
    portal.isPending;

  const pendingPlanKey =
    checkout.variables?.planKey ?? change.variables?.planKey ?? null;

  return (
    <>
      {current && (
        <CurrentPlan
          isAnyMutating={isAnyMutating}
          isCancelPending={cancel.isPending}
          isPortalPending={portal.isPending}
          isResumePending={resume.isPending}
          onCancel={() => cancel.mutate()}
          onPortal={() => portal.mutate()}
          onResume={() => resume.mutate()}
          subscription={current}
        />
      )}
      <PlanCards
        isAnyMutating={isAnyMutating}
        isChangePending={change.isPending}
        isCheckoutPending={checkout.isPending}
        onChange={(input) => change.mutate(input)}
        onCheckout={(input) => checkout.mutate(input)}
        pendingPlanKey={pendingPlanKey}
        subscription={current}
      />
    </>
  );
};
