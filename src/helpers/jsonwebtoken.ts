import jsonwebtoken from 'jsonwebtoken';
import { jwt } from '../config/jwt';

export interface IPayload {
  id: number;
  email?: string;
  role: string;
  iat?: number;
}

export const issueToken = (payload: IPayload): string => {
  return jsonwebtoken.sign(payload, jwt.secret, {
    expiresIn: jwt.expires,
  });
};

export const verifyToken = (token: string): IPayload => {
  return jsonwebtoken.verify(token, jwt.secret) as IPayload;
};
