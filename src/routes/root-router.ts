import { createRoute } from "@hono/zod-openapi";
import { z } from "zod";

import * as HTTPStatusCodes from "@/lib/constants/http-status-codes";
import { createRouter } from "@/lib/utils/create-app";
import { jsonContent } from "@/lib/utils/openapi/helpers";

const RootRouter = createRouter().openapi(
  createRoute({
    method: "get",
    path: "/",
    tags: ["Root"],
    responses: {
      [HTTPStatusCodes.OK]: jsonContent(
        z.object({
          message: z.string(),
        }),
        "Root Path",
      ),
    },
  }),
  (c) => {
    return c.json({
      message: "Hello World",
    });
  },
);

export default RootRouter;
