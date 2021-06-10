import UserDAO from "../dao/UserDAO";

import { UserDTO } from "../types/UserTypes";

class UserService {
  create(userDTO: UserDTO) {
    const { username, email, password, name, image } = userDTO;
    return UserDAO.create(username, email, password, name, image);
  }
}

export default new UserService();
