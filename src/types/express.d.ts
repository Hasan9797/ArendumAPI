import { CustomJwtPayload } from '@/Interfaces/CustomJwtPayload.Interface';

declare global {
	namespace Express {
		interface Request {
			user?: CustomJwtPayload; // Add user to the Request interface
		}
	}
}
