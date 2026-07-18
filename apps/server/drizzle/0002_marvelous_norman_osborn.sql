ALTER TABLE "subscriptions" ADD COLUMN IF NOT EXISTS "scheduledBillingInterval" text;--> statement-breakpoint
ALTER TABLE "subscriptions" ADD COLUMN IF NOT EXISTS "scheduledPlanKey" text;--> statement-breakpoint
