import { database as db } from '../database/db';

import { UserUnSanitizedResponse } from '../types/UserTypes';

class PersonDAO {
  public async register(
    username: string,
    email: string,
    password: string,
    name?: string,
    image?: string,
  ): Promise<UserUnSanitizedResponse> {
    const [data] = await db('users')
      .insert({ username, email, password, name, image, role: 'AUTHENTICATED', is_verified: false })
      .returning('*');

    return data as UserUnSanitizedResponse;
  }

  public async login(identifier: string): Promise<UserUnSanitizedResponse> {
    const [data] = await db('users').where('username', identifier).orWhere('email', identifier);
    return data as UserUnSanitizedResponse;
  }

  public async findOne(id: number): Promise<UserUnSanitizedResponse> {
    const [data] = await db('users').where('user_id', id);
    return data as UserUnSanitizedResponse;
  }
}

export default new PersonDAO();
