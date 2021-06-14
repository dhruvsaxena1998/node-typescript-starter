import UserDAO from '../dao/UserDAO';

import { hash, compare } from '../helpers/hashing';
import jwt from '../helpers/jsonwebtoken';
import { ApiError } from '../helpers/apiErrorHandler';

import { UserDTO, UserLoginDTO, UserUnSanitizedResponse } from '../types/UserTypes';
import sanitize from '../helpers/sanitize';

const issueToken = (payload: UserUnSanitizedResponse) => {
  const token = jwt.issueToken({
    id: payload.user_id,
    role: payload.role,
    email: payload.email,
  });

  return { token, user: sanitize(payload, 'users') };
};

class UserService {
  async register(userDTO: UserDTO) {
    const { username, email, password, name, image } = userDTO;

    const hashedPassword = await hash(password);
    const user = await UserDAO.register(username, email, hashedPassword, name, image);

    return issueToken(user);
  }

  async login(userDTO: UserLoginDTO) {
    const { identifier, password } = userDTO;
    const user = await UserDAO.login(identifier);

    if (!user) return ApiError.badRequest('User not found');

    const isSamePassword = await compare(password, user.password);
    if (!isSamePassword) return ApiError.badRequest('Incorrect password!');

    return issueToken(user);
  }
}

export default new UserService();
