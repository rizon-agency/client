import { integer, timestamp } from "drizzle-orm/pg-core";

export const id = () =>
  integer().primaryKey().generatedAlwaysAsIdentity({
    startWith: 1000,
  });

export const createdAt = () => timestamp().notNull().defaultNow();
export const updatedAt = () =>
  timestamp()
    .notNull()
    .defaultNow()
    .$onUpdate(() => new Date());

export const timestamps = () => ({
  createdAt: createdAt(),
  updatedAt: updatedAt(),
});
