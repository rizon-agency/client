import { initENV } from "@server/config/env";
import { defineConfig } from "drizzle-kit";

const env = initENV();

export default defineConfig({
  dialect: "postgresql",
  schema: "./src/infrastructure/database/schemas/index.ts",
  out: "./drizzle",
  dbCredentials: {
    url: env.POSTGRES_CONNECTION_STRING,
  },
});
