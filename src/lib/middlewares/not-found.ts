import type { NotFoundHandler } from "hono";

import { NOT_FOUND } from "@/lib/constants/http-status-codes";

export const notFound: NotFoundHandler = (c) => {
  return c.json({
    message: "Not Found",
    route: c.req.path,
  }, NOT_FOUND);
};
