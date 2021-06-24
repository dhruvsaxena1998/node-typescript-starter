import Joi, { ValidationError } from 'joi';
import isEmpty from 'lodash/isEmpty';

import { buildErrorObject } from './util';
import { ApiError } from '../../helpers/apiErrorHandler';
// Types
import { Request, Response, NextFunction } from 'express';

export const RegisterValidator = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    if (isEmpty(req.body)) return next(ApiError.emptyBody());
    const schema = Joi.object({
      username: Joi.string().required(),
      email: Joi.string().email().required(),
      password: Joi.string().required(),
      name: Joi.string(),
      image: Joi.string(),
    });
    await schema.validateAsync(req.body);
    next();
  } catch (err) {
    if (err instanceof ValidationError) return next(buildErrorObject(err));
    return next(err);
  }
};

export const LoginValidator = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    if (isEmpty(req.body)) return next(ApiError.emptyBody());
    const schema = Joi.object({
      identifier: Joi.string().required(),
      password: Joi.string().required(),
    });
    await schema.validateAsync(req.body);
    next();
  } catch (err) {
    if (err instanceof ValidationError) return next(buildErrorObject(err));
    return next(err);
  }
};

export const UpdateValidator = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    if (isEmpty(req.body)) return next(ApiError.emptyBody());
    const schema = Joi.object({
      name: Joi.string(),
      image: Joi.string(),
    });
    await schema.validateAsync(req.body);
    next();
  } catch (err) {
    if (err instanceof ValidationError) return next(buildErrorObject(err));
    return next(err);
  }
};
