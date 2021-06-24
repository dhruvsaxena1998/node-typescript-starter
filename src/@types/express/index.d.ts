import { UserSanitizedResponse } from '../User.types';

declare module 'express' {
  export interface Request {
    user?: UserSanitizedResponse | null;
  }
}
