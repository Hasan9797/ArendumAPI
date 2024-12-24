import { Request } from 'express';
import { CustomJwtPayload } from './customJwtPayload';

export interface RequestCustom extends Request {
  user?: CustomJwtPayload;
}
