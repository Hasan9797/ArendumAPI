import { CustomJwtPayload } from '@/interfaces/customJwtPayload';
import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || 'secret-access-key';
const JWT_REFRESH_SECRET =
  process.env.JWT_REFRESH_SECRET || 'secret-refresh-key';

export const generateAccessToken = (
  payload: CustomJwtPayload,
  expiresIn: string = '20m'
): string => {
  return jwt.sign(payload, JWT_SECRET, { expiresIn });
};

export const generateRefreshAccessToken = (
  payload: CustomJwtPayload,
  expiresIn: string = '7d'
): string => {
  return jwt.sign(payload, JWT_REFRESH_SECRET, { expiresIn });
};

export const verifyToken = (token: string) => {
  return jwt.verify(token, JWT_SECRET);
};
