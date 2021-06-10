import { Router as _Router } from "express";
const Router = _Router();

import UserController from "../controllers/UserController";

Router.post("/register", UserController.register);

export default Router;
