import { Request, Response, NextFunction, ErrorRequestHandler } from 'express';
import { logger } from './logger';
import { Error } from '../types/Error';

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
}

export const ErrorHandler = (error: ErrorRequestHandler, req: Request, res: Response, next: NextFunction): void => {
  if (error instanceof ApiError) {
    res.status(error.statusCode).send(error.message);
    return;
  }

  res.status(500).send('Something went wrong');
  next();
};
