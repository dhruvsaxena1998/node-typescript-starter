import { ApiError } from '../helpers/apiErrorHandler';

import { Error } from '../types/Error';

interface ValidatorError extends Error {
  context: { key?: string; label?: string };
}

export const buildErrorObject = ({ message, path, type, context: { key } }: ValidatorError): ApiError =>
  ApiError.badRequest({ message, path, type, key });
