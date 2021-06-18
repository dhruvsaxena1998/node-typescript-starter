import pino from 'pino';
import { env } from './env-helper';

import { Request, Response, NextFunction } from 'express';

const config: pino.LoggerOptions = {
  level: env.string('LOG_LEVEL', 'debug'),
  timestamp: env.bool('LOG_TIMESTAMP', false),
};

let logger: pino.BaseLogger;
if (env.string('NODE_ENV') !== 'production') {
  logger = pino({
    ...config,
    prettyPrint: {
      colorize: true,
    },
  });
} else {
  logger = pino(
    config,
    pino.destination({
      dest: 'debug.log',
      sync: false,
    }),
  );
}

const getResponseTime = (start: [number, number]) => {
  const NS_PER_SEC = 1e9; //  convert to nanoseconds
  const NS_TO_MS = 1e6; // convert to milliseconds
  const diff = process.hrtime(start);
  return (diff[0] * NS_PER_SEC + diff[1]) / NS_TO_MS;
};

const apiLogger = (req: Request, res: Response, next: NextFunction): void => {
  (async () => {
    const start = process.hrtime();
    const delta = getResponseTime(start).toLocaleString();
    const message = `${req.method} ${req.url} (${delta} ms)`;
    logger.debug(message);
    next();
  })();
};

export { logger, apiLogger };
