import { Request, Response, NextFunction } from 'express';

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
