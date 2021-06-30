import express from 'express';

import cors from 'cors';
import helmet from 'helmet';
import { router } from './routes';
import { bootstrap } from './config/functions/bootstrap';

import { Authenticate } from './middlewares/auth';

import swaggerUI from 'swagger-ui-express';
import full_documentation from './documentation/full_documentation.json';

import { ErrorHandler } from './helpers/apiErrorHandler';
import { apiLogger } from './helpers/logger';

const app = express();

// Middlewares
app.use(cors());
app.use(helmet());
app.use(express.json({ limit: '30mb' }));
app.use(express.urlencoded({ limit: '30mb', extended: true }));

// Middleware to logs api request
app.use(apiLogger);

// Authenticate middleware
/**
 * Set user info to req.user object, null if authentication token is not provided
 */
app.use(Authenticate);

// Routes
app.get('/', (req: express.Request, res: express.Response) => {
  return res.status(200).send({ message: 'HelloWorld' });
});
app.use('/api', router);
app.use('/public', express.static('public/'));
app.use('/uploads', express.static('public/uploads/'));

// Swagger documentation
app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(full_documentation));

/*
 * Keep error-handler as last middleware
 */
app.use(ErrorHandler);

// Bootstrap function runs before staring app
bootstrap(app);

export { app };
