import type { Logger as DrizzleLogger } from "drizzle-orm";
import type { Connection } from "mysql2/promise";

import { drizzle } from "drizzle-orm/mysql2";
import { createConnection } from "mysql2/promise";

import ENV from "@/env";
import { logger } from "@/utils/logger";

// import * as schema from "./schema";

let client: Connection;

class QueryLogger implements DrizzleLogger {
  logQuery(query: string, params: unknown[]): void {
    logger.debug(JSON.stringify({ query, params }));
  }
}

function getDatabaseInstance(client: Connection) {
  return drizzle(client, {
    // schema, // FIXME: Schema is not working with drizzle
    logger: new QueryLogger(),
  });
}

export async function getConnection() {
  if (!client) {
    client = await createConnection({
      host: ENV.DB_HOST,
      port: ENV.DB_PORT,
      user: ENV.DB_USER,
      password: ENV.DB_PASS,
      database: ENV.DB_NAME,
    });

    return getDatabaseInstance(client);
  }

  return getDatabaseInstance(client);
}
