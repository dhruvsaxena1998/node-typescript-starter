import { ROLE } from './index';

export interface UserCreateDto {
  username: string;
  email: string;
  password: string;
  role: ROLE;
  name?: string;
  image?: string;
  is_verified: boolean;
}

export type UserRegisterRequestDto = Omit<UserCreateDto, 'role' | 'is_verified'>;

export interface UserLoginRequestDto {
  identifier: string;
  password: string;
}

export interface UserData {
  user_id: number;
  username: string;
  password: string;
  email: string;
  name?: string;
  role: string;
  is_verified: boolean;
  image?: string;
  created_at: Date;
  updated_at: Date;
}

export type SanitizedUserData = Omit<UserData, 'password'>;

export interface AuthorizedResponse {
  token: string;
  user: SanitizedUserData;
}
