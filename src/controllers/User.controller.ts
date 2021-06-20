import { UserService, service } from '../services/User.service';

// Types
import { Request, Response, NextFunction } from 'express';
import { UserRegisterRequestDto, UserLoginRequestDto } from '../@types/User.types';

export class UserController {
  constructor(private readonly _service: UserService) {
    this.login = this.login.bind(this);
    this.register = this.register.bind(this);
    this.me = this.me.bind(this);
  }

  public async register(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const { email, username, password, name, image } = req.body;
      const dto: UserRegisterRequestDto = { email, username, password, name, image };

      const data = await this._service.register(dto);
      res.status(201).send(data);
    } catch (err) {
      return next(err);
    }
  }

  public async login(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const { identifier, password } = req.body;
      const dto: UserLoginRequestDto = { identifier, password };

      const data = await this._service.login(dto);
      res.status(200).send(data);
    } catch (err) {
      return next(err);
    }
  }

  public async me(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      // eslint-disable-next-line no-console
      console.log('req.user', req.user);
      res.status(200).send(req.user);
    } catch (err) {
      return next(err);
    }
  }
}

export const controller = new UserController(service);