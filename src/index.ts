import dotenv from 'dotenv';
dotenv.config();

import { env } from './helpers/common';

import { app } from './app';
import { logger } from './helpers/logger';

const HOST = env('SERVER_HOST', 'localhost');
const PORT = Number(env('SERVER_PORT', '5000'));

app.listen(PORT, HOST, () => {
  logger.info(`🚀 Server is up and running at http://${HOST}:${PORT}`);
});
