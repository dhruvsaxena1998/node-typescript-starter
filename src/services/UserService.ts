import UserDAO from '../dao/UserDAO';

import { hash, compare } from '../helpers/hashing';
import jwt from '../helpers/jsonwebtoken';
import { ApiError } from '../helpers/apiErrorHandler';

import { UserDTO, UserLoginDTO } from '../types/UserTypes';
import sanitize from '../helpers/sanitize';

class UserService {
  async register(userDTO: UserDTO) {
    const { username, email, password, name, image } = userDTO;

    const hashedPassword = await hash(password);
    const user = await UserDAO.register(username, email, hashedPassword, name, image);

    const token = jwt.issueToken({
      id: user.user_id,
      role: user.role,
      email: user.email,
    });

    return { token, user: sanitize(user, 'users') };
  }

  async login(userDTO: UserLoginDTO) {
    const { identifier, password } = userDTO;
    const user = await UserDAO.login(identifier);

    if (!user) {
      return ApiError.badRequest('User not found');
    }

    const isSamePassword = await compare(password, user.password);
    if (!isSamePassword) {
      return ApiError.badRequest('Incorrect password!');
    }

    const token = jwt.issueToken({
      id: user.user_id,
      role: user.role,
      email: user.email,
    });

    return { token, user: sanitize(user, 'users') };
  }
}

export default new UserService();
