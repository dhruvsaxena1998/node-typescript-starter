/*
 * Use below command to generate random jwt_secret
 * node -e "console.log(require('crypto').randomBytes(64).toString('base64'))"
 */
import { env } from '../helpers/env-helper';

export const jwt = {
  secret: env.string('JWT_SECRET', 'a606f398-51e9-4ba8-b8bb-02326f666bdf'),
  expires: env.string('JWT_EXPIRES', '30d'),
};
