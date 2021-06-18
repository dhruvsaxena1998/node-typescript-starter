/*
 * Use below command to generate random jwt_secret
 * node -e "console.log(require('crypto').randomBytes(64).toString('base64'))"
 */
import { env } from '../helpers/common';

export const jwt = {
  secret: env('JWT_SECRET', 'a606f398-51e9-4ba8-b8bb-02326f666bdf'),
  expires: env('JWT_EXPIRES', '30d'),
};
