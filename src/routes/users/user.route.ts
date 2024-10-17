import { createRoute, z } from "@hono/zod-openapi";
import { OK } from "@lib/constants/http-status-codes";
import { jsonContent } from "@lib/utils/openapi/helpers";

export const tags = ["Users"];

export const CreateUser = createRoute({
  path: "/users",
  method: "post",
  tags,
  responses: {
    [OK]: jsonContent(
      z.object({
        response: z.object({}),
      }),
      "Create User",
    ),
  },
});
export type CreateUserRoute = typeof CreateUser;

export const GetUserByID = createRoute({
  path: "/users/{id}",
  method: "get",
  tags,
  responses: {
    [OK]: jsonContent(
      z.object({
        response: z.object({}),
      }),
      "Get User By ID",
    ),
  },
});
export type GetUserByIDRoute = typeof GetUserByID;
