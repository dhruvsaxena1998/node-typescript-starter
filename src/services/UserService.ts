import UserDAO from '../dao/UserDAO';

import { hash, compare } from '../helpers/hashing';
import * as jwt from '../helpers/jsonwebtoken';
import { ApiError } from '../helpers/apiErrorHandler';

import {
  AuthResponse,
  UserRegisterDTO,
  UserLoginDTO,
  UserSanitizedResponse,
  UserUnSanitizedResponse,
} from '../types/UserTypes';
import { sanitizeEntity } from '../helpers/sanitize';

const issueToken = (payload: UserUnSanitizedResponse): AuthResponse => {
  const token = jwt.issueToken({
    id: payload.user_id,
    role: payload.role,
    email: payload.email,
  });

  return { token, user: sanitizeEntity(payload, 'users') as UserSanitizedResponse };
};

class UserServices {
  public async register(userDTO: UserRegisterDTO): Promise<AuthResponse> {
    const { username, email, password, name, image } = userDTO;

    const hashedPassword = await hash(password);
    const user = await UserDAO.register(username, email, hashedPassword, name, image);

    return issueToken(user);
  }

  public async login(userDTO: UserLoginDTO): Promise<AuthResponse> {
    const { identifier, password } = userDTO;
    const user = await UserDAO.login(identifier);

    if (!user)
      throw ApiError.badRequest({
        key: 'identifier',
        message: 'User not found!',
        type: 'err.not-found',
        path: ['username', 'email'],
      });

    const isSamePassword = await compare(password, user.password);
    if (!isSamePassword)
      throw ApiError.badRequest({
        key: 'password',
        message: 'Password is incorrect!',
        type: 'err.password-mismatch',
        path: ['password'],
      });

    return issueToken(user);
  }
}

export const UserService = new UserServices();
