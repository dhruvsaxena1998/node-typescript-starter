import { UserRepository, repository } from '../repositories/User.repository';

// Helpers
import { sanitizeEntity } from '../helpers/sanitize';

// Types
import { UserUpdateDto, SanitizedUserData } from '../@types/User.types';

export class UserService {
  constructor(private readonly _repository: UserRepository) {}

  public findOne = async (id: number): Promise<SanitizedUserData> => {
    const user = await this._repository.findOne(id);
    return sanitizeEntity(user, 'users') as SanitizedUserData;
  };

  public findOneAndUpdate = async (id: number, dto: UserUpdateDto): Promise<SanitizedUserData> => {
    const user = await this._repository.findOneAndUpdate(id, dto);
    return sanitizeEntity(user, 'users') as SanitizedUserData;
  };
}

export const service = new UserService(repository);
