import { UserRepository, repository } from '../repositories/User.repository';

// Helpers
import { ApiError } from '../helpers/apiErrorHandler';
import { hash, compare } from '../helpers/hashing';
import { issueTokenV2 } from '../helpers/jsonwebtoken';
import { sanitizeEntity } from '../helpers/sanitize';

// Types
import {
  ROLE,
  AuthorizedResponse,
  UserCreateDto,
  SanitizedUserData,
  UserLoginRequestDto,
  UserRegisterRequestDto,
} from '../@types/User';

export class UserService {
  constructor(private readonly repository: UserRepository) {}

  public async register(dto: UserRegisterRequestDto): Promise<AuthorizedResponse> {
    dto.password = await hash(dto.password);
    const body: UserCreateDto = {
      ...dto,
      role: ROLE.AUTHENTICATED, // set a default hard-coded role, for security purposes
      is_verified: true,
    };

    const user = await this.repository.create(body);
    const token = issueTokenV2([user.user_id, user.role]);

    return { token, user: sanitizeEntity(user, 'users') as SanitizedUserData };
  }

  public async login(dto: UserLoginRequestDto): Promise<AuthorizedResponse> {
    const user = await this.repository.findOneWithIdentifier(dto.identifier);

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

    const token = issueTokenV2([user.user_id, user.role]);

    return { token, user: sanitizeEntity(user, 'users') as SanitizedUserData };
  }
}

export const service = new UserService(repository);
