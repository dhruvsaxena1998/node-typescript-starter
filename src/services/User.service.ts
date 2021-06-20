import { UserRepository, repository } from '../repositories/User.repository';

// Helpers
import { ApiError } from '../helpers/apiErrorHandler';
import { hash, compare } from '../helpers/hashing';
import { issueToken } from '../helpers/jsonwebtoken';
import { sanitizeEntity } from '../helpers/sanitize';

// Types
import { ROLE } from '../@types';
import {
  AuthorizedResponse,
  UserCreateDto,
  SanitizedUserData,
  UserLoginRequestDto,
  UserRegisterRequestDto,
} from '../@types/User.types';

export class UserService {
  constructor(private readonly _repository: UserRepository) {
    // this bind
    this.login = this.login.bind(this);
    this.findOne = this.findOne.bind(this);
  }

  public async register(dto: UserRegisterRequestDto): Promise<AuthorizedResponse> {
    dto.password = await hash(dto.password);
    const body: UserCreateDto = {
      ...dto,
      role: ROLE.AUTHENTICATED, // set a default hard-coded role, for security purposes
      is_verified: true,
    };

    const user = await this._repository.create(body);
    const token = issueToken({
      id: user.user_id,
      role: user.role,
    });

    return { token, user: sanitizeEntity(user, 'users') as SanitizedUserData };
  }

  public async login(dto: UserLoginRequestDto): Promise<AuthorizedResponse> {
    const user = await this._repository.findOneWithIdentifier(dto.identifier);
    // Check if the user exists.
    if (!user)
      throw ApiError.badRequest({
        key: 'identifier',
        message: 'User not found!',
        type: 'err.not-found',
        path: ['username', 'email'],
      });

    // Check if password is valid
    const validPassword = await compare(dto.password, user.password);
    if (!validPassword)
      throw ApiError.badRequest({
        key: 'identifier',
        message: 'Identifier or password invalid.',
        type: 'err.invalid',
        path: ['identifier', 'password'],
      });

    const token = issueToken({
      id: user.user_id,
      role: user.role,
    });

    return { token, user: sanitizeEntity(user, 'users') as SanitizedUserData };
  }

  public async findOne(id: number | string): Promise<SanitizedUserData> {
    const user = await this._repository.findOne({ user_id: id });
    return sanitizeEntity(user, 'users') as SanitizedUserData;
  }
}

export const service = new UserService(repository);
