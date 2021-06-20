import { Router } from 'express';
const router = Router();

import { UserRouter } from './User.routes';

router.use('/users', UserRouter);

export { router };
