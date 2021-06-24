import { database as _db } from '../database/db';

// Types
import { UserCreateDto, UserData } from '../@types/User.types';
export class UserRepository {
  public create = async (dto: UserCreateDto): Promise<UserData> => {
    const [data] = await _db('users').insert(dto).returning('*');
    return data as UserData;
  };

  public findOne = async (where: { [key: string]: unknown }): Promise<UserData> => {
    const [data] = await _db('users').where(where);
    return data as UserData;
  };

  public findOneWithIdentifier = async (identifier: string): Promise<UserData> => {
    const [data] = await _db('users').where('username', identifier).orWhere('email', identifier);
    return data as UserData;
  };
}

export const repository = new UserRepository();
