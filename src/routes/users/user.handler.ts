import type { AppRouteHandler } from "@lib/@types/app";

import type { CreateUserRoute, GetUserByIDRoute } from "./user.route";

export const CreateUserHandler: AppRouteHandler<CreateUserRoute> = async (c) => {
  return c.json({
    response: {},
  });
};

export const GetUserByIDHandler: AppRouteHandler<GetUserByIDRoute> = async (c) => {
  return c.json({
    response: {},
  });
};
