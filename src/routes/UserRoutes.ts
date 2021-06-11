import { Router as _Router } from 'express';
const Router = _Router();

import UserController from '../controllers/UserController';
import { RegisterValidator, LoginValidator } from '../validators/UserValidator';

Router.post('/login', [LoginValidator], UserController.login);
Router.post('/register', [RegisterValidator], UserController.register);

export default Router;
