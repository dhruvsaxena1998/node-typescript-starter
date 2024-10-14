import type { OpenAPIHono } from "@hono/zod-openapi";

export interface AppBindings {
  //   Variables: {};
}

export type AppOpenAPI = OpenAPIHono<AppBindings>;
