import type { Logger as DrizzleLogger } from "drizzle-orm";

import { drizzle } from "drizzle-orm/mysql2";

import ENV from "@/env";
import { logger } from "@/utils/logger";

import * as schema from "./schema";

class QueryLogger implements DrizzleLogger {
  logQuery(query: string, params: unknown[]): void {
    logger.debug(JSON.stringify({ query, params }));
  }
}

export const database = drizzle({
  connection: {
    host: ENV.DB_HOST,
    port: ENV.DB_PORT,
    user: ENV.DB_USER,
    password: ENV.DB_PASS,
    database: ENV.DB_NAME,
  },
  logger: new QueryLogger(),
  mode: "default",
  schema,
});
