import { prettyJSON } from "hono/pretty-json";
import { secureHeaders } from "hono/secure-headers";

import ENV from "@/env";
import createApp from "@/lib/utils/create-app";
import configureOpenApiSpec from "@/lib/utils/openapi/configure-openapi-spec";
import RootRouter from "@/routes/root-router";
import UserRouter from "@/routes/users";
import { pinoHttpLogger } from "@/utils/logger";

import packageJSON from "../package.json";

const app = createApp();

app.use(secureHeaders());
app.use(pinoHttpLogger());
app.use(prettyJSON());

if (ENV.NODE_ENV !== "prod") {
  configureOpenApiSpec(app, {
    title: packageJSON.name,
    version: packageJSON.version,
  });
}

const routes = [
  RootRouter,
  UserRouter,
];

routes.forEach((route) => {
  app.route("/", route);
});

export { app };
