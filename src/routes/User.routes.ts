import { Router } from 'express';
const UserRouter = Router();

import { controller as UserController } from '../controllers/User.controller';

// Middlewares
import { Authorize } from '../middlewares/auth';
import { UpdateValidator } from '../middlewares/validators/User.validator';

// Types
import { ROLE } from '../@types';

/**
 * @route   /users/me
 * @method  GET
 * @description Returns user's object. Expects JWT token
 */
UserRouter.get('/me', [Authorize([ROLE.ADMINSTRATOR, ROLE.AUTHENTICATED])], UserController.me);

/**
 * @route   /users
 * @method  PUT
 * @description Updates logged-in user.
 */
UserRouter.put('/', [Authorize([ROLE.ADMINSTRATOR, ROLE.AUTHENTICATED]), UpdateValidator], UserController.update);

export { UserRouter };
