import { eq } from "drizzle-orm";

import type { AppRouteHandler } from "@/lib/@types/app";

import { database } from "@/database/drizzle";
import { users } from "@/database/schema/users.sql";
import * as HTTPStatusCodes from "@/lib/constants/http-status-codes";

import type { CreateUserRoute, GetAllUsersRoute, GetUserByIDRoute } from "./user.route";

export const CreateUserHandler: AppRouteHandler<CreateUserRoute> = async (
  ctx,
) => {
  const json = ctx.req.valid("json");

  const [result] = await database
    .insert(users)
    .values({
      name: json.name,
      email: json.email,
      password: json.password,
    })
    .$returningId();

  return ctx.json(
    {
      success: true,
      data: { ...result, ...json },
    },
    HTTPStatusCodes.OK,
  );
};

export const GetUserByIDHandler: AppRouteHandler<GetUserByIDRoute> = async (
  ctx,
) => {
  const { id } = ctx.req.valid("param");

  const [result] = await database
    .select()
    .from(users)
    .where(eq(users.id, id))
    .limit(1);

  if (!result) {
    return ctx.json(
      {
        success: false,
        error: {
          issues: [{ message: "User not found!" }],
        },
      },
      HTTPStatusCodes.NOT_FOUND,
    );
  }

  return ctx.json({ success: true, data: result }, HTTPStatusCodes.OK);
};

export const GetAllUsersHandler: AppRouteHandler<GetAllUsersRoute> = async (
  ctx,
) => {
  // const result = await database.select().from(users);
  const result = await database.query.users.findMany();

  return ctx.json(
    {
      success: true,
      data: result,
    },
    HTTPStatusCodes.OK,
  );
};
