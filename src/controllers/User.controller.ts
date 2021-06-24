import { UserService, service } from '../services/User.service';
import { ApiError } from '../helpers/apiErrorHandler';

// Types
import { Request, Response, NextFunction } from 'express';
import { UserRegisterRequestDto, UserLoginRequestDto } from '../@types/User.types';

export class UserController {
  constructor(private readonly _service: UserService) {}

  public register = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const { email, username, password, name, image } = req.body;
      const dto: UserRegisterRequestDto = { email, username, password, name, image };

      const data = await this._service.register(dto);
      res.status(201).send(data);
    } catch (err) {
      return next(err);
    }
  };

  public login = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const { identifier, password } = req.body;
      const dto: UserLoginRequestDto = { identifier, password };

      const data = await this._service.login(dto);
      res.status(200).send(data);
    } catch (err) {
      return next(err);
    }
  };

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
