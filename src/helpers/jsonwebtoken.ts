import jsonwebtoken from 'jsonwebtoken';
import config from '../config/jwt';

export interface IPayload {
  id: number;
  email?: string;
  role: string;
  iat?: number;
}

export const issueToken = (payload: IPayload): string => {
  return jsonwebtoken.sign(payload, config.secret, {
    expiresIn: config.expires,
  });
};

export const verifyToken = (token: string): IPayload => {
  return jsonwebtoken.verify(token, config.secret) as IPayload;
};

export default { issueToken, verifyToken };
