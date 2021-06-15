import { Request, Response, NextFunction } from 'express';
import UserService from '../services/UserService';

class UserController {
  async register(req: Request, res: Response, next: NextFunction) {
    try {
      const data = await UserService.register(req.body);
      res.status(201).send(data);
    } catch (err) {
      return next(err);
    }
  }

  async login(req: Request, res: Response, next: NextFunction) {
    try {
      const data = await UserService.login(req.body);
      res.status(200).send(data);
    } catch (err) {
      return next(err);
    }
  }
}

export default new UserController();
