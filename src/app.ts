import createApp from "@lib/utils/create-app";
import configureOpenApiSpec from "@lib/utils/openapi/configure-openapi-spec";

import RootRouter from "./routes/root-router";
import WorkflowRouter from "./routes/workflow";

const app = createApp();
configureOpenApiSpec(app);

const routes = [
  RootRouter,
  WorkflowRouter,
];

routes.forEach((route) => {
  app.route("/", route);
});

export { app };
