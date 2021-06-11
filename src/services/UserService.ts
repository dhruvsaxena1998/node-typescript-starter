import UserDAO from '../dao/UserDAO';

import { hash } from '../helpers/hashing';
import jwt from '../helpers/jsonwebtoken';

import { UserDTO } from '../types/UserTypes';

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

    return { token, user };
  }
}

export default new UserService();
