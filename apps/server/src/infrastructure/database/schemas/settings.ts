import { pgTable, text } from "drizzle-orm/pg-core";
import { id, timestamps } from "../utils";

export const settingsTable = pgTable("settings", {
  settingId: id(),

  // -- fields
  key: text().notNull().unique(),
  value: text().notNull(),

  // -- timestamps
  ...timestamps(),
});

export type SettingsTable = typeof settingsTable;
export type Setting = SettingsTable["$inferSelect"];
export type SettingInsert = SettingsTable["$inferInsert"];
