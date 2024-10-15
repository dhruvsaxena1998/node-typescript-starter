import createApp from "@lib/utils/create-app";
import { PinoLogger } from "@lib/utils/logger";
import configureOpenApiSpec from "@lib/utils/openapi/configure-openapi-spec";
import { prettyJSON } from "hono/pretty-json";
import { secureHeaders } from "hono/secure-headers";

import RootRouter from "./routes/root-router";
import WorkflowRouter from "./routes/workflow";

const app = createApp();

app.use(secureHeaders());
app.use(PinoLogger());
app.use(prettyJSON());

configureOpenApiSpec(app);

const routes = [RootRouter, WorkflowRouter];

routes.forEach((route) => {
  app.route("/", route);
});

export { app };
