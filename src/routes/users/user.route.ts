import { createRoute, z } from "@hono/zod-openapi";
import {
  NOT_FOUND,
  OK,
  UNPROCESSABLE_ENTITY,
} from "@lib/constants/http-status-codes";
import {
  createErrorSchema,
  createNotFoundSchema,
  createParamsSchema,
  createSuccessSchema,
  jsonContent,
} from "@lib/utils/openapi/helpers";
import { insertUsersSchema, selectUsersSchemaOpenAPI } from "#schemas/users.sql";

export const tags = ["Users"];

export const CreateUser = createRoute({
  path: "/users",
  method: "post",
  tags,
  request: {
    body: jsonContent(
      insertUsersSchema,
      "Request Body",
    ),
  },
  responses: {
    [OK]: jsonContent(
      createSuccessSchema(selectUsersSchemaOpenAPI),
      "Create User",
    ),
    [UNPROCESSABLE_ENTITY]: jsonContent(
      createErrorSchema(insertUsersSchema),
      "Validation Error(s)",
    ),
  },
});
export type CreateUserRoute = typeof CreateUser;

export const GetUserByID = createRoute({
  path: "/users/{id}",
  method: "get",
  tags,
  request: {
    params: createParamsSchema("id"),
  },
  responses: {
    [OK]: jsonContent(
      createSuccessSchema(selectUsersSchemaOpenAPI),
      "User",
    ),
    [NOT_FOUND]: jsonContent(
      createNotFoundSchema("User not found!"),
      "Not Found",
    ),
    [UNPROCESSABLE_ENTITY]: jsonContent(
      createErrorSchema(createParamsSchema("id")),
      "Validation Error(s)",
    ),
  },
});
export type GetUserByIDRoute = typeof GetUserByID;
