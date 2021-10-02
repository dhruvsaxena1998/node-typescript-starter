import Ajv from 'ajv';
import isEmpty from 'lodash/isEmpty';

// Helpers
import { buildErrorObject } from './util';
import { ApiError } from '../../helpers/apiErrorHandler';

// Types
import { Request, Response, NextFunction } from 'express';

const ajv = new Ajv();
export const UpdateValidator = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  if (isEmpty(req.body)) return next(ApiError.emptyBody());
  const schema = {
    type: 'object',
    properties: {
      name: { type: 'string' },
      image: { type: 'string' },
    },

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
