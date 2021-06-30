import { Router } from 'express';
const AuthRouter = Router();

import { controller as AuthController } from '../controllers/Auth.controller';

// Middlewares
import { LoginValidator, RegisterValidator } from '../middlewares/validators/Auth.validator';

/**
 * @route   /users/login
 * @method  POST
 */
AuthRouter.post('/login', [LoginValidator], AuthController.login);

/**
 * @route   /users/register
 * @method  POST
 */
AuthRouter.post('/register', [RegisterValidator], AuthController.register);

export { AuthRouter };
