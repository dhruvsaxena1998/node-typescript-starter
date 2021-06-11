export interface UserDTO {
  username: string;
  email: string;
  password: string;
  name?: string;
  image?: string;
}

export interface UserSanitizedResponse {
  user_id: number;
  role: string;
  username: string;
  email: string;
  name?: string;
  is_verified: boolean;
  image?: string;
  created_at: Date;
  updated_at: Date;
}
