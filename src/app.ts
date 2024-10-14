import createApp from "@lib/utils/create-app";
import configureOpenApiSpec from "@lib/utils/openapi/configure-openapi-spec";

import RootRouter from "./routes";

const app = createApp();
configureOpenApiSpec(app);

app.route("/", RootRouter);

export { app };
