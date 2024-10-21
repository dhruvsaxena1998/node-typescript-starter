import { serve } from "@hono/node-server";

import ENV from "@/env";
import { logger } from "@/utils/logger";

import { app } from "./app";

const port = ENV.SERVER_PORT;

logger.info(`
    Server is up and running...
    
    Server: http://localhost:${port}
    Documentation: http://localhost:${port}/reference
`);

serve({
  fetch: app.fetch,
  port,
});
