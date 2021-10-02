import isEmpty from 'lodash/isEmpty';
import Ajv from 'ajv';

// Helpers
import { buildErrorObject } from './util';
import { ApiError } from '../../helpers/apiErrorHandler';

// Types
import { Request, Response, NextFunction } from 'express';

const ajv = new Ajv();
export const RegisterValidator = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  if (isEmpty(req.body)) return next(ApiError.emptyBody());
  const schema = {
    type: 'object',
    properties: {
      username: { type: 'string' },
      email: { type: 'string' },
      password: { type: 'string' },
      name: { type: 'string' },
      image: { type: 'string' },
    },
    required: ['username', 'email', 'password'],
    additionalProperties: false,
  };
  const validate = ajv.compile(schema);

  const valid = validate(req.body);

  if (valid) {
    next();
  } else {
    next(buildErrorObject(validate.errors));
  }
};

export const LoginValidator = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  if (isEmpty(req.body)) return next(ApiError.emptyBody());
  const schema = {
    type: 'object',
    properties: {
      identifier: { type: 'string' },
      password: { type: 'string' },
    },
    required: ['identifier', 'password'],
    additionalProperties: false,
  };
  const validate = ajv.compile(schema);

  const valid = validate(req.body);

  if (valid) {
    next();
  } else {
    next(buildErrorObject(validate.errors));
  }
};
