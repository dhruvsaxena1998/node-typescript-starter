import { database } from '../database/db';

// Types
import { UserCreateDto, UserData } from '../@types/User.types';
export class UserRepository {
  private readonly _db = database;
  constructor() {
    // this binding
    this.findOne = this.findOne.bind(this);
    this.findOneWithIdentifier = this.findOneWithIdentifier.bind(this);
  }

  public async create(dto: UserCreateDto): Promise<UserData> {
    const [data] = await this._db('users').insert(dto).returning('*');
    return data as UserData;
  }

  public async findOne(where: { [key: string]: unknown }): Promise<UserData> {
    const [data] = await this._db('users').where(where);
    return data as UserData;
  }

  public async findOneWithIdentifier(identifier: string): Promise<UserData> {
    const [data] = await this._db('users').where('username', identifier).orWhere('email', identifier);
    return data as UserData;
  }
}

export const repository = new UserRepository();
