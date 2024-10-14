import { createRoute, z } from "@hono/zod-openapi";
import { OK } from "@lib/constants/http-status-codes";
import { jsonContent } from "@lib/utils/openapi/helpers";

export const tags = ["Workflow"];

export const post = createRoute({
  path: "/workflow",
  method: "post",
  tags,
  responses: {
    [OK]: jsonContent(
      z.object({
        response: z.object({
        }),
      }),
      "Workflow Post",
    ),
  },
});
export type WorkflowPostRoute = typeof post;
