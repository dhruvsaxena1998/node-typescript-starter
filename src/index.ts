import { serve } from "@hono/node-server";
import { Logger } from "@lib/utils/logger";

import { app } from "./app";
import ENV from "./env";

const port = ENV.SERVER_PORT;

Logger.info(`
    Server is up and running...
    
    Server: http://localhost:${port}
    Documentation: http://localhost:${port}/reference
`);

serve({
  fetch: app.fetch,
  port,
});
