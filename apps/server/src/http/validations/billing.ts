import { z } from "zod";

export const createCheckoutSessionSchema = z.object({
  billingInterval: z.union([z.literal("monthly"), z.literal("yearly")]),
  planKey: z.union([
    z.literal("starter"),
    z.literal("pro"),
    z.literal("business"),
  ]),
});

export const changeSubscriptionSchema = createCheckoutSessionSchema;
