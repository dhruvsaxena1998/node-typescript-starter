import { OpenAPIHono } from "@hono/zod-openapi";

import type { AppBindings, AppOpenAPI } from "../@types/app";

import { onError } from "../middlewares/error-handler";
import { notFound } from "../middlewares/not-found";
import { ValidationHook } from "./openapi/configure-openapi-spec";

export function createRouter() {
  const app = new OpenAPIHono<AppBindings>({
    strict: false,
    defaultHook: ValidationHook,
  });

  return app;
}

function createApp() {
  const app = createRouter();

  app.notFound(notFound);
  app.onError(onError);

  return app;
}

export function createTestRouter(router: AppOpenAPI) {
  const testApp = createApp();
  testApp.route("/", router);
  return testApp;
}

export default createApp;
