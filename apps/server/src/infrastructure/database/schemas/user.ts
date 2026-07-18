import { pgTable, integer, text, pgEnum, timestamp } from "drizzle-orm/pg-core";
import { id, timestamps } from "../utils";
import { roles, tokenTypes } from "@server/config/constants";

export const rolesEnum = pgEnum("roles", roles);

export const usersTable = pgTable("users", {
  userId: id(),

  // -- fields
  email: text().notNull(),
  role: rolesEnum().notNull().default("user"),

  // -- timestamps
  emailVerifiedAt: timestamp(),
  ...timestamps(),
});

export type UsersTable = typeof usersTable;
export type User = UsersTable["$inferSelect"];
export type UserInsert = UsersTable["$inferInsert"];

export const sessionsTable = pgTable("sessions", {
  sessionId: id(),

  // -- fields
  session: text().notNull().unique(),

  // -- references
  userId: integer()
    .notNull()
    .references(() => usersTable.userId, { onDelete: "cascade" }),

  // -- timestamps
  expiresAt: timestamp().notNull(),
  ...timestamps(),
});

export type SessionsTable = typeof sessionsTable;
export type Session = SessionsTable["$inferSelect"];
export type SessionInsert = SessionsTable["$inferInsert"];

export const passwordsTable = pgTable("passwords", {
  passwordId: id(),

  // -- fields
  hashedPassword: text().notNull(),

  // -- references
  userId: integer()
    .notNull()
    .references(() => usersTable.userId, { onDelete: "cascade" }),

  // -- timestamps
  ...timestamps(),
});

export type PasswordsTable = typeof passwordsTable;
export type Password = PasswordsTable["$inferSelect"];
export type PasswordInsert = PasswordsTable["$inferInsert"];

export const tokenTypesEnum = pgEnum("tokenTypes", tokenTypes);

export const tokensTable = pgTable("tokens", {
  tokenId: id(),

  // -- fields
  token: text().notNull().unique(),
  type: tokenTypesEnum().notNull(),

  // -- references
  userId: integer()
    .notNull()
    .references(() => usersTable.userId, { onDelete: "cascade" }),

  // -- timestamps
  expiresAt: timestamp().notNull(),
  ...timestamps(),
});

export type TokensTable = typeof tokensTable;
export type Token = TokensTable["$inferSelect"];
export type TokenInsert = TokensTable["$inferInsert"];
