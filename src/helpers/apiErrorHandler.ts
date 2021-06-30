import { logger } from './logger';

// Types
import { Error } from '../@types/Error';
import { Request, Response, NextFunction } from 'express';

export class ApiError {
  public statusCode: number;
  public message: Error;

  constructor(statusCode: number, message: Error) {
    this.statusCode = statusCode;
    this.message = message;
  }

  public static badRequest(message: Error): ApiError {
    logger.error(message);
    return new ApiError(400, message);
  }

  public static forbidden(
    code: 401 | 403 = 403,
    message: Error = {
      key: 'token',
      message: 'Forbidden',
      type: 'err.forbidden',
      path: ['authentication'],
    },
  ): ApiError {
    logger.error(message);
    return new ApiError(code, message);
  }

  public static limited(
    message: Error = {
      key: 'ratelimit',
      message: 'Too many requests!',
      type: 'err.ratelimit',
      path: ['rate-limit'],
    },
  ): ApiError {
    logger.error(message);
    return new ApiError(429, message);
  }

  public static internalError(
    message: Error = {
      message: 'Something went wrong!',
      type: 'err.internal',
      key: 'internal-server',
    },
  ): ApiError {
    logger.error(message);
    return new ApiError(500, message);
  }

  public static emptyBody(
    message: Error = {
      message: 'Request body is empty',
      type: 'err.body-null',
      key: 'req.body',
    },
  ): ApiError {
    logger.error(message);
    return new ApiError(400, message);
  }
}

export const ErrorHandler = (error: Error, req: Request, res: Response, next: NextFunction): void => {
  if (error instanceof ApiError) {
    res.status(error.statusCode).send(error.message);
    return;
  }

  logger.error(error);
  res.status(500).send(error.message);
  next();
};
