import { Request, Response, NextFunction } from "express";
import { ApiError } from "../helpers/apiErrorHandler";
import PersonService from "../services/UserService";

class PersonController {
  async register(req: Request, res: Response, next: NextFunction) {
    try {
      const data = await PersonService.register(req.body);
      res.status(201).send(data);
    } catch (err) {
      return next(ApiError.error(err.code));
    }
  }
}

export default new PersonController();
