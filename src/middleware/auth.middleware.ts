import { CustomJwtPayload } from '@/Interfaces/CustomJwtPayload.Interface';
import { verifyToken } from '@/utils/auth.util';
import { Request, Response, NextFunction } from 'express';

export const authentication = (
	req: Request,
	res: Response,
	next: NextFunction
): void => {
	const token = req.headers.authorization?.split(' ')[1];

	if (!token) {
		res.status(403).json({ message: 'Access denied, no token provided' });
		return;
	}

	try {
		const decoded = verifyToken(token) as CustomJwtPayload;
		req.user = decoded;
		next();
	} catch (error) {
		res.status(401).json({ message: 'Invalid or expired token' });
	}
};

export const authorization = (req: Request, res: Response, next: NextFunction) => {
	const token = req.headers.authorization?.split(' ')[1];

	if (!token) {
		res.status(403).json({ message: 'Access denied, no token provided' });
		return;
	}
	const user = verifyToken(token) as CustomJwtPayload;

	if (!user || typeof user.role !== 'number') {
		res.status(403).json({ message: 'Access denied: Invalid or missing role' });
		return;
	}

	const userRole = user.role;
	
	if (userRole !== 1) {
		res.status(403).json({ message: 'Access denied' });
		return;
	}

	next();
};

