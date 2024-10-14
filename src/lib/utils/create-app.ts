import { OpenAPIHono } from "@hono/zod-openapi";

import type { AppBindings } from "../@types/app";

import { notFound, onError } from "../middlewares";
import { defaultHook } from "./openapi/configure-openapi-spec";

export function createRouter() {
  const app = new OpenAPIHono<AppBindings>({
    strict: false,
    defaultHook,
  });

  return app;
}

function createApp() {
  const app = createRouter();

  app.notFound(notFound);
  app.onError(onError);

  return app;
}

export default createApp;
