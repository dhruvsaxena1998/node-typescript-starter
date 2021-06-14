import db from '../database/db';

import { UserUnSanitizedResponse } from '../types/UserTypes';

class PersonDAO {
  async register(username: string, email: string, password: string, name?: string, image?: string) {
    const [data] = await db('users')
      .insert({ username, email, password, name, image, role: 'AUTHENTICATED', is_verified: false })
      .returning('*');

    return data as UserUnSanitizedResponse;
  }

  async login(identifier: string) {
    const [data] = await db('users').where('username', identifier).orWhere('email', identifier);
    return data as UserUnSanitizedResponse;
  }
}

export default new PersonDAO();
