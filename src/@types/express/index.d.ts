import { SanitizedUserData } from '../User.types';

declare module 'express' {
  export interface Request {
    user?: SanitizedUserData | null;
  }
}
