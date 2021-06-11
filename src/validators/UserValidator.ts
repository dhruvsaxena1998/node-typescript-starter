import Joi from 'joi';
import { ApiError } from '../helpers/apiErrorHandler';

// Types
import { Request, Response, NextFunction } from 'express';

const schema = Joi.object({
  username: Joi.string().required(),
  email: Joi.string().email().required(),
  password: Joi.string().pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')).required(),
  name: Joi.string(),
  image: Joi.string(),
});

export const RegisterValidator = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    await schema.validateAsync(req.body);
    next();
  } catch (err) {
    next(ApiError.badRequest(err.details[0]));
  }
};
