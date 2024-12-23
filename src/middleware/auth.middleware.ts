import { Request, Response, NextFunction } from 'express';
import { verifyToken } from '../utils/auth.util';
import { RequestCustom } from '../interfaces/authenticated-request.interface';
import { customJwtPayload } from '../interfaces/customJwtPayload';

export const authentication = (
  req: RequestCustom,
  res: Response,
  next: NextFunction
): void => {
  const token = req.headers.authorization?.split(' ')[1];

  if (!token) {
    res.status(403).json({ message: 'Access denied, no token provided' });
    return;
  }

  try {
    const decoded = verifyToken(token) as customJwtPayload;
    req.user = decoded;
    next();
  } catch (error) {
    res.status(401).json({ message: 'Invalid or expired token' });
  }
};

export const authorization = (allowedRoles: number[]) => {
  authentication;
  return (req: RequestCustom, res: Response, next: NextFunction) => {
    if (!req.user || !req.user.role || !allowedRoles.includes(req.user.role)) {
      res
        .status(403)
        .json({ message: 'Access denied: Invalid or missing role' });
      return;
    }
    next();
  };
};
