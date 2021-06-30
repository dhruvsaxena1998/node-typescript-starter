import { ApiError } from '../helpers/apiErrorHandler';
import { verifyToken } from '../helpers/jsonwebtoken';
import { service } from '../services/User.service';

// Types
import { Request, Response, NextFunction } from 'express';
import { ROLE } from '../@types';

/**
 * @description
 *  Add user data or null to request { req.user }
 * @param req.user - SanitizedUserData
 */
export const Authenticate = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const authHeaders = req.headers['authorization'];
    if (!authHeaders) throw null;

    const [, token] = authHeaders.split(/Bearer\s/);
    const { id } = verifyToken(token);

    req.user = await service.findOne(id);
    next();
  } catch (err) {
    req.user = null;
    next();
  }
};

export const Authorize =
  (roles: ROLE[]) =>
  async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    if (!req.user) return next(ApiError.forbidden(401));

    const role = req.user.role as ROLE;
    if (!roles.includes(role)) return next(ApiError.forbidden(403));

    return next();
  };
