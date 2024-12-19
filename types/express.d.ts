import { CustomJwtPayload } from '@/Interfaces/CustomJwtPayload.Interface';

declare global {
	namespace Express {
		interface Request {
			user?: CustomJwtPayload;
		}
	}
}
