import { database } from '../database/db';

// Types
import { UserCreateDto, UserData } from '../@types/User';
export class UserRepository {
  private readonly db = database;

  public async create(dto: UserCreateDto): Promise<UserData> {
    const [data] = await this.db('users').insert(dto).returning('*');
    return data as UserData;
  }

  public async findOne(where: { [key: string]: string }): Promise<UserData> {
    const [data] = await this.db('users').where(where);
    return data as UserData;
  }

  public async findOneWithIdentifier(identifier: string): Promise<UserData> {
    const [data] = await this.db('users').where('username', identifier).orWhere('email', identifier);
    return data as UserData;
  }
}

export const repository = new UserRepository();
