import { UserSanitizedResponse } from '../UserTypes';

declare module 'express' {
  export interface Request {
    user?: UserSanitizedResponse | null;
  }
}
