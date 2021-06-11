export interface UserDTO {
  username: string;
  email: string;
  password: string;
  name?: string;
  image?: string;
}

export interface UserLoginDTO {
  identifier: string;
  password: string;
}

export interface UserSanitizedResponse {
  user_id: number;
  username: string;
  email: string;
  name?: string;
  role: string;
  is_verified: boolean;
  image?: string;
  created_at: Date;
  updated_at: Date;
}

export interface UserUnSanitizedResponse extends UserSanitizedResponse {
  password: string;
}
