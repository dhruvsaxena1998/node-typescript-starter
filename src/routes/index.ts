import { Router as _Router } from "express";
const Router = _Router();

import UserRoutes from "./UserRoutes";

Router.use("/users", UserRoutes);

export default Router;
