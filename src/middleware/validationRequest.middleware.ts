import { validate } from 'class-validator';
import { plainToInstance } from 'class-transformer';
import { NextFunction, Request, Response } from 'express';

export const validationMiddleware = (dtoClass: any) => {
	return async (req: Request, res: Response, next: NextFunction) => {
		const dtoObject = plainToInstance(dtoClass, req.body);
		const errors = await validate(dtoObject);

		if (errors.length > 0) {
			return res.status(400).json({
				message: 'Validation failed',
				errors: errors.map(err => ({
					property: err.property,
					constraints: err.constraints,
				})),
			});
		}

		// Proceed to the next middleware or route handler
		return next();
	};
};
