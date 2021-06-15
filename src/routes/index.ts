import { Router } from 'express';
const router = Router();

import { UserRouter } from './UserRoutes';

router.use('/users', UserRouter);

export { router };
