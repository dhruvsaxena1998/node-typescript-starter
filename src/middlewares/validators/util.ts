import { ApiError } from '../../helpers/apiErrorHandler';

// Types
import { ValidationError, ValidationErrorItem } from 'joi';

export const buildErrorObject = (err: ValidationError): ApiError => {
  const { details } = err;
  const { message, path, type, context }: ValidationErrorItem = details[0];
  return ApiError.badRequest({ message, path, type, key: context?.key });
};
