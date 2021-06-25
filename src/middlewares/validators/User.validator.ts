import Joi, { ValidationError } from 'joi';
import isEmpty from 'lodash/isEmpty';

// Helpers
import { buildErrorObject } from './util';
import { ApiError } from '../../helpers/apiErrorHandler';

// Types
import { Request, Response, NextFunction } from 'express';

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
