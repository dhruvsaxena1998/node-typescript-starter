import Joi from 'joi';
import { ApiError } from '../helpers/apiErrorHandler';

// Types
import { Request, Response, NextFunction } from 'express';

export const RegisterValidator = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
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
    next(ApiError.badRequest(err.details[0]));
  }
};

export const LoginValidator = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const schema = Joi.object({
      identifier: Joi.string().required(),
      password: Joi.string().required(),
    });
    await schema.validateAsync(req.body);
    next();
  } catch (err) {
    next(ApiError.badRequest(err.details[0]));
  }
};
