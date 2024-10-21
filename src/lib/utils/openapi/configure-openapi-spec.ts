import type { Hook } from "@hono/zod-openapi";

import { apiReference } from "@scalar/hono-api-reference";

import type { AppOpenAPI } from "../../@types/app";

import { UNPROCESSABLE_ENTITY } from "../../constants/http-status-codes";

function configureOpenApiSpec(app: AppOpenAPI, info: {
  title: string;
  version: string;
}) {
  app.doc("/openapi", {
    openapi: "3.0.0",
    info: {
      title: info.title,
      version: info.version,
    },
  });

  app.get(
    "/reference",
    apiReference({
      theme: "saturn",
      layout: "classic",
      defaultHttpClient: {
        clientKey: "fetch",
        targetKey: "javascript",
      },
      spec: {
        url: "/openapi",
      },
    }),
  );
}

export const ValidationHook: Hook<any, any, any, any> = (result, c) => {
  if (!result.success) {
    return c.json(
      {
        success: result.success,
        error: result.error,
      },
      UNPROCESSABLE_ENTITY,
    );
  }
};

export default configureOpenApiSpec;
