import * as HTTPStatusCodes from "@/lib/constants/http-status-codes";
import { createRouter } from "@/lib/utils/create-app";
import { createSuccessSchema, jsonContent } from "@/lib/utils/openapi/helpers";
import { createRoute, z } from "@hono/zod-openapi";

const RootRouter = createRouter().openapi(
  createRoute({
    method: "get",
    path: "/",
    tags: ["Root"],
    responses: {
      [HTTPStatusCodes.OK]: jsonContent(
        createSuccessSchema(
          z.object({
            message: z.string(),
          }),
        ),
        "Root Path",
      ),
    },
  }),
  (c) => {
    return c.json({
      success: true,
      data: {
        message: "Hello World",
      },
    });
  },
);

export default RootRouter;
