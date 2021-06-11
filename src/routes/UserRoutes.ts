import { Router as _Router } from 'express';
const Router = _Router();

import UserController from '../controllers/UserController';
import { RegisterValidator } from '../validators/UserValidator';

Router.post('/register', [RegisterValidator], UserController.register);

export default Router;
