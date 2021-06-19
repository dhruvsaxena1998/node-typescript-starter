import dotenv from 'dotenv';
dotenv.config({
  path: './.env',
});

import { env } from './helpers/env-helper';

import { app } from './app';
import { logger } from './helpers/logger';

const HOST = env.string('SERVER_HOST', 'localhost');
const PORT = env.number('SERVER_PORT', 5000);

app.listen(PORT, HOST, () => {
  logger.info(`🚀 Server is up and running at http://${HOST}:${PORT}`);
});
