import { createRoute, z } from "@hono/zod-openapi";

import {
  insertUsersSchema,
  selectUsersSchemaOpenAPI,
} from "@/database/schema/users.sql";
import {
  NOT_FOUND,
  OK,
  UNPROCESSABLE_ENTITY,
} from "@/lib/constants/http-status-codes";
import {
  createErrorSchema,
  createSuccessSchema,
  createValidationErrorSchema,
  jsonContent,
} from "@/lib/utils/openapi/helpers";

export const tags = ["Users"];

export const CreateUser = createRoute({
  path: "/users",
  method: "post",
  tags,
  request: {
    body: jsonContent(insertUsersSchema, "Request Body"),
  },
  responses: {
    [OK]: jsonContent(
      createSuccessSchema(selectUsersSchemaOpenAPI),
      "Create User",
    ),
    [UNPROCESSABLE_ENTITY]: jsonContent(
      createValidationErrorSchema(insertUsersSchema),
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
    params: z.object({ id: z.number() }).openapi({ example: { id: 1 } }),
  },
  responses: {
    [OK]: jsonContent(createSuccessSchema(selectUsersSchemaOpenAPI), "User"),
    [NOT_FOUND]: jsonContent(createErrorSchema("User not found!"), "Not Found"),
    [UNPROCESSABLE_ENTITY]: jsonContent(
      createValidationErrorSchema(
        z.object({ id: z.number() }).openapi({ example: { id: 1 } }),
      ),
      "Validation Error(s)",
    ),
  },
});
export type GetUserByIDRoute = typeof GetUserByID;

export const GetAllUsers = createRoute({
  path: "/users",
  method: "get",
  tags,
  responses: {
    [OK]: jsonContent(
      createSuccessSchema(z.array(selectUsersSchemaOpenAPI)),
      "All Users",
    ),
  },
});
export type GetAllUsersRoute = typeof GetAllUsers;
