import { Pool } from "pg";
import { drizzle } from "drizzle-orm/node-postgres";
import { migrate } from "drizzle-orm/node-postgres/migrator";
import * as schema from "./schemas";

interface InitDBParams {
  connectionCredentials:
    | string
    | {
        port: number;
        host: string;
        user: string;
        pass: string;
        name: string;
      };
}

export const initDB = async ({ connectionCredentials }: InitDBParams) => {
  const pool = new Pool({
    connectionString:
      typeof connectionCredentials === "string"
        ? connectionCredentials
        : undefined,

    ...(typeof connectionCredentials !== "string"
      ? {
          host: connectionCredentials.host,
          port: connectionCredentials.port,
          user: connectionCredentials.user,
          password: connectionCredentials.pass,
          database: connectionCredentials.name,
        }
      : {}),
  });

  const db = drizzle({ client: pool, schema });

  return {
    db,
    pool,
    migrate: () => migrate(db, { migrationsFolder: "drizzle" }),
  };
};

type InitDBReturnType = Awaited<ReturnType<typeof initDB>>;
export type DB = Omit<InitDBReturnType["db"], "$client">;
export type POOL = InitDBReturnType["pool"];
export type DBConnection = {
  db: DB;
  pool: POOL;
};
