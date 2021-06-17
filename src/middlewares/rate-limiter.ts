import { Request, Response, NextFunction } from 'express';

import { RateLimiterRedis } from 'rate-limiter-flexible';
import { client } from '../helpers/cache';

import { ApiError } from './../helpers/apiErrorHandler';

const limiter = new RateLimiterRedis({
  // Redis is recommended as it's fast and scallable.

  /*
    If you want memory based cache check-out https://github.com/animir/node-rate-limiter-flexible/wiki/Memory#ratelimitermemory
    or any other client https://github.com/animir/node-rate-limiter-flexible/wiki
    and modify code as per need
  */

  storeClient: client, // -> redis client
  keyPrefix: 'middleware',
  points: 3, // 10 requests
  duration: 60, // per 60 second by IP
});

type RateLimitMiddleware = (req: Request, res: Response, next: NextFunction) => void;

/**
 * @param points
 * @param duration
 * @returns rate-limit Middleware
 */
export const RateLimiter = (points?: number, duration?: number): RateLimitMiddleware => {
  if (points) limiter.points = points;
  if (duration) limiter.duration = duration;

  return (req, res, next): void => {
    limiter
      .consume(req.ip)
      .then(() => {
        next();
      })
      .catch(() => {
        return next(ApiError.limited());
      });
  };
};
