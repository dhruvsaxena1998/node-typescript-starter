import { Request, Response, NextFunction } from 'express';
import { ApiError } from '../helpers/apiErrorHandler';
import UserService from '../services/UserService';

class UserController {
  async register(req: Request, res: Response, next: NextFunction) {
    try {
      const data = await UserService.register(req.body);
      res.status(201).send(data);
    } catch (err) {
      return next(ApiError.error(err.code));
    }
  }

  async login(req: Request, res: Response, next: NextFunction) {
    try {
      const data = await UserService.login(req.body);
      res.status(200).send(data);
    } catch (err) {
      return next(ApiError.error(err.code));
    }
  }
}

export default new UserController();
