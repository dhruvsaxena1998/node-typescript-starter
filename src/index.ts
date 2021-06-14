import 'dotenv/config';
import app from './app';
import logger from './helpers/logger';

const HOST = process.env.HOST || 'localhost';
const PORT = Number(process.env.SERVER_PORT) || 5000;

app.listen(PORT, HOST, () => {
  logger.info(`🚀 Server is up and running at http://${HOST}:${PORT}`);
});
