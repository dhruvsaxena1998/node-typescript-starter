import jsonwebtoken from "jsonwebtoken";
import config from "../config/jwt";

export interface IPayload {
  id: number;
  email?: string;
  role: string;
}

export const issueToken = (payload: IPayload) => {
  return jsonwebtoken.sign(payload, config.secret, {
    expiresIn: config.expires,
  });
};

export const verifyToken = (token: string) => {
  return jsonwebtoken.verify(token, config.secret);
};

export default { issueToken, verifyToken };
