import { Router } from 'express';
const router = Router();

import { AuthRouter } from './Auth.routes';
import { UserRouter } from './User.routes';

router.use('/auth', AuthRouter);
router.use('/users', UserRouter);

export { router };
