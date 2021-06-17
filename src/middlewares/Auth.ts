import { Request, Response, NextFunction } from 'express';
import { ApiError } from '../helpers/apiErrorHandler';

import { verifyToken } from '../helpers/jsonwebtoken';
import { UserService } from '../services/UserService';

export const Authenticate = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const authHeaders = req.headers['authorization'];
    if (!authHeaders) throw null;

    const [, token] = authHeaders.split(/Bearer\s/);
    const { id } = verifyToken(token);

    req.user = await UserService.findOne(id);
    next();
  } catch (err) {
    req.user = null;
    next();
  }
};

export enum ROLES {
  ADMINSTRATOR = 'ADMINSTRATOR',
  AUTHENTICATED = 'AUTHENTICATED',
  PUBLIC = 'PUBLIC',
}
export const Authorize =
  (roles: ROLES[]) =>
  async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    if (!req.user) return next(ApiError.forbidden(401));

    const role = req.user.role as ROLES;
    if (!roles.includes(role)) return next(ApiError.forbidden(403));

    return next();
  };
