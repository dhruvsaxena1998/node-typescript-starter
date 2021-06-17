import { Router } from 'express';
const UserRouter = Router();

import { UserController } from '../controllers/UserController';

import { Authorize, ROLES } from '../middlewares/Auth';
import { RegisterValidator, LoginValidator } from '../validators/UserValidator';

/**
 * @route   /users/login
 * @method  POST
 */
UserRouter.post('/login', [LoginValidator], UserController.login);

/**
 * @route   /users/register
 * @method  POST
 */
UserRouter.post('/register', [RegisterValidator], UserController.register);

/**
 * @route   /users/me
 * @method  GET
 * @description Returns user's object. Expects JWT token
 */
UserRouter.get('/me', [Authorize([ROLES.AUTHENTICATED])], UserController.me);

export { UserRouter };
