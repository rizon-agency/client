CREATE TABLE IF NOT EXISTS "billingCustomers" (
  "billingCustomerId" integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  "userId" integer NOT NULL REFERENCES "users"("userId") ON DELETE cascade,
  "provider" text NOT NULL,
  "providerCustomerId" text NOT NULL,
  "createdAt" timestamp DEFAULT now() NOT NULL,
  "updatedAt" timestamp DEFAULT now() NOT NULL,
  CONSTRAINT "billingCustomers_userId_unique" UNIQUE("userId"),
  CONSTRAINT "billingCustomers_providerCustomerId_unique" UNIQUE("providerCustomerId")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "subscriptions" (
  "subscriptionId" integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  "billingCustomerId" integer NOT NULL REFERENCES "billingCustomers"("billingCustomerId") ON DELETE cascade,
  "provider" text NOT NULL,
  "providerSubscriptionId" text NOT NULL,
  "providerPriceId" text,
  "planKey" text NOT NULL,
  "billingInterval" text NOT NULL,
  "status" text NOT NULL,
  "cancelAtPeriodEnd" boolean DEFAULT false NOT NULL,
  "currentPeriodStart" timestamp,
  "currentPeriodEnd" timestamp,
  "pastDueAt" timestamp,
  "endedAt" timestamp,
  "createdAt" timestamp DEFAULT now() NOT NULL,
  "updatedAt" timestamp DEFAULT now() NOT NULL,
  CONSTRAINT "subscriptions_providerSubscriptionId_unique" UNIQUE("providerSubscriptionId")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "billingEvents" (
  "billingEventId" integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  "provider" text NOT NULL,
  "providerEventId" text NOT NULL,
  "type" text NOT NULL,
  "payload" jsonb NOT NULL,
  "processedAt" timestamp,
  "createdAt" timestamp DEFAULT now() NOT NULL,
  "updatedAt" timestamp DEFAULT now() NOT NULL,
  CONSTRAINT "billingEvents_providerEventId_unique" UNIQUE("providerEventId")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "checkoutAttempts" (
  "checkoutAttemptId" integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  "userId" integer NOT NULL REFERENCES "users"("userId") ON DELETE cascade,
  "provider" text NOT NULL,
  "providerCheckoutSessionId" text,
  "planKey" text NOT NULL,
  "billingInterval" text NOT NULL,
  "expiresAt" timestamp NOT NULL,
  "completedAt" timestamp,
  "createdAt" timestamp DEFAULT now() NOT NULL,
  "updatedAt" timestamp DEFAULT now() NOT NULL,
  CONSTRAINT "checkoutAttempts_providerCheckoutSessionId_unique" UNIQUE("providerCheckoutSessionId")
);
--> statement-breakpoint
ALTER TABLE "subscriptions" ADD COLUMN IF NOT EXISTS "providerPriceId" text;
--> statement-breakpoint
ALTER TABLE "subscriptions" ADD COLUMN IF NOT EXISTS "currentPeriodStart" timestamp;
--> statement-breakpoint
ALTER TABLE "subscriptions" ADD COLUMN IF NOT EXISTS "pastDueAt" timestamp;
