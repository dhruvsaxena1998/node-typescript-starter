import { Router } from 'express';
const UserRouter = Router();

import { UserController } from '../controllers/UserController';
import { RegisterValidator, LoginValidator } from '../validators/UserValidator';

UserRouter.post('/login', [LoginValidator], UserController.login);
UserRouter.post('/register', [RegisterValidator], UserController.register);

export { UserRouter };
