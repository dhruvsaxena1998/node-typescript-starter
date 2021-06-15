import { Request, Response, NextFunction } from 'express';
import { UserService } from '../services/UserService';

class UserControllers {
  public async register(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const data = await UserService.register(req.body);
      res.status(201).send(data);
    } catch (err) {
      return next(err);
    }
  }

  public async login(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const data = await UserService.login(req.body);
      res.status(200).send(data);
    } catch (err) {
      return next(err);
    }
  }
}

export const UserController = new UserControllers();
