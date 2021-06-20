import { Router } from 'express';
const UserRouter = Router();

import { controller } from '../controllers/User.controller';

import { ROLE } from '../@types';
import { Authorize } from '../middlewares/auth';
import { RegisterValidator, LoginValidator } from '../validators/User.validator';

/**
 * @route   /users/login
 * @method  POST
 */
UserRouter.post('/login', [LoginValidator], controller.login);

/**
 * @route   /users/register
 * @method  POST
 */
UserRouter.post('/register', [RegisterValidator], controller.register);

/**
 * @route   /users/me
 * @method  GET
 * @description Returns user's object. Expects JWT token
 */
UserRouter.get('/me', [Authorize([ROLE.ADMINSTRATOR, ROLE.AUTHENTICATED])], controller.me);

export { UserRouter };
