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
    host: ENV.MYSQL_HOST,
    port: ENV.MYSQL_PORT,
    user: ENV.MYSQL_USER,
    password: ENV.MYSQL_PASSWORD,
    database: ENV.MYSQL_DATABASE,
  },
  logger: new QueryLogger(),
  mode: "default",
  schema,
});
