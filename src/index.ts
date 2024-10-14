import { serve } from "@hono/node-server";

import { app } from "./app";
import ENV from "./env";

const port = ENV.SERVER_PORT;

// eslint-disable-next-line no-console
console.log(`Server is running on port http://localhost:${port}`);

serve({
  fetch: app.fetch,
  port,
});
