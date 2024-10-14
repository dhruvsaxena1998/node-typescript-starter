import { serve } from "@hono/node-server";

import { app } from "./app";
import ENV from "./env";

const port = ENV.SERVER_PORT;

// eslint-disable-next-line no-console
console.table({
  Server: `http://localhost:${port}`,
  Documentation: `http://localhost:${port}/reference`,
});

serve({
  fetch: app.fetch,
  port,
});
