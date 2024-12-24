import { Request } from 'express';
import { customJwtPayload } from './customJwtPayload';

export interface RequestCustom extends Request {
  user?: customJwtPayload;
}
