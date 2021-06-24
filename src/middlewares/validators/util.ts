import { ApiError } from '../../helpers/apiErrorHandler';

// Types
import { ValidationError, ValidationErrorItem } from 'joi';

export const buildErrorObject = (err: unknown): ApiError => {
  const { details } = err as ValidationError;
  const { message, path, type, context }: ValidationErrorItem = details[0];
  return ApiError.badRequest({ message, path, type, key: context?.key });
};
