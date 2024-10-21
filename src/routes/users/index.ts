import { createRouter } from "@/lib/utils/create-app";

import * as handlers from "./user.handler";
import * as routes from "./user.route";

const UserRouter = createRouter()
  .openapi(routes.CreateUser, handlers.CreateUserHandler)
  .openapi(routes.GetUserByID, handlers.GetUserByIDHandler)
  .openapi(routes.GetAllUsers, handlers.GetAllUsersHandler);

export default UserRouter;
