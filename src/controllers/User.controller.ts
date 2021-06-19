import { UserService, service } from '../services/User.service';

// Types
import { Request, Response, NextFunction } from 'express';
import { UserRegisterRequestDto, UserLoginRequestDto } from './../@types/User';

export class UserController {
  constructor(private readonly service: UserService) {}

  public async register(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const { email, username, password, name, image } = req.body;
      const dto: UserRegisterRequestDto = { email, username, password, name, image };

      const data = await this.service.register(dto);
      res.status(201).send(data);
    } catch (err) {
      return next(err);
    }
  }

  public async login(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const { identifier, password } = req.body;
      const dto: UserLoginRequestDto = { identifier, password };

      const data = await this.service.login(dto);
      res.status(200).send(data);
    } catch (err) {
      return next(err);
    }
  }
}

export const controller = new UserController(service);
