import { UserService, service } from '../services/User.service';
import { ApiError } from '../helpers/apiErrorHandler';

// Types
import { Request, Response, NextFunction } from 'express';

export class UserController {
  constructor(private readonly _service: UserService) {}

  public me = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      res.status(200).send(req.user);
    } catch (err) {
      return next(err);
    }
  };

  public update = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      if (!req.user) return next(ApiError.forbidden());

      // only allow user to update themselves
      const { user_id } = req.user;
      const data = await this._service.findOneAndUpdate(user_id, req.body);
      res.status(200).send(data);
    } catch (err) {
      return next(err);
    }
  };
}

export const controller = new UserController(service);
