import type { ErrorHandler } from "hono";
import type { StatusCode } from "hono/utils/http-status";

import { env } from "node:process";

import { INTERNAL_SERVER_ERROR, OK } from "../constants/http-status-codes";

export const onError: ErrorHandler = (err, c) => {
  const currentStatus =
    "status" in err ? err.status : c.newResponse(null).status;

  const statusCode =
    currentStatus !== OK
      ? (currentStatus as StatusCode)
      : INTERNAL_SERVER_ERROR;

  const environment = c.env?.NODE_ENV || env.NODE_ENV;
  return c.json(
    {
      message: err.message,
      stack: environment === "prod" ? undefined : err.stack,
    },
    statusCode,
  );
};
