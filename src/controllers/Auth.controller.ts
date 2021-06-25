import { AuthService, service } from '../services/Auth.service';

// Types
import { Request, Response, NextFunction } from 'express';
import { UserLoginRequestDto, UserRegisterRequestDto } from '../@types/User.types';

export class AuthController {
  constructor(private readonly _service: AuthService) {}

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

  /*
    TODO:
    [WIP] Controller needs to be work on.
      - resetPassword
      - forgotPassword
      - emailConfirmation
      - sendEmailConfirmation
  */
}

export const controller = new AuthController(service);
