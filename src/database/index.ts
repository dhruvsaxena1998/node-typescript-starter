import type { Logger as DrizzleLogger } from "drizzle-orm";
import type { Connection } from "mysql2/promise";

import { Logger } from "@lib/utils/logger";
import ENV from "~/src/env";
import { drizzle } from "drizzle-orm/mysql2";
import { createConnection } from "mysql2/promise";

let client: Connection;

class QueryLogger implements DrizzleLogger {
  logQuery(query: string, params: unknown[]): void {
    Logger.debug(JSON.stringify({ query, params }));
  }
}

function getDatabaseInstance(client: Connection) {
  return drizzle(client, {
    logger: new QueryLogger(),
  });
}

export async function connect() {
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
