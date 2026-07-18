export type Role = "admin" | "user";
export const roles: [Role, ...Role[]] = ["admin", "user"];

export type TokenType = "email-verification" | "reset-password";
export const tokenTypes: [TokenType, ...TokenType[]] = [
  "email-verification",
  "reset-password",
];

/**
 * 30 days
 */
export const AUTH_SESSION_EXPIRATION_DURATION_MS = 30 * 24 * 60 * 60 * 1000;

/**
 * expires in 15 minutes
 */
export const EMAIL_ADDRESS_VERIFICATION_EXPIRATION_DURATION_MS = 15 * 60 * 1000;

/**
 * expires in 15 minutes
 */
export const RESET_PASSWORD_EXPIRATION_DURATION_MS = 15 * 60 * 1000;

export const AUTH_SESSION_COOKIE_NAME = "auth-session";

export const SETUP_KEY = "setup";

export const DEFAULT_RECORD_LIMIT = 9;

export const BILLING_PAST_DUE_GRACE_PERIOD_MS = 3 * 24 * 60 * 60 * 1_000;
