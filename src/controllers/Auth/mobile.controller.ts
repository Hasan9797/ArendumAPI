import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import { CustomJwtPayload } from '@/Interfaces/CustomJwtPayload.Interface';
import prisma from '@/config/prisma';

const JWT_SECRET = 'mySecretTsKey';

export class AuthController {

	// Foydalanuvchi login
	static async login(req: Request, res: Response) {
		const { phoneNumber } = req.body;

		if (!phoneNumber) {
			return res.status(400).json({ message: 'phoneNumber are required' });
		}

		// Foydalanuvchini topish
		const user = await prisma.user.findUnique({
			where: { phone: phoneNumber },
		});

		if (!user) {
			return res.status(401).json({ message: 'Invalid credentials' });
		}

		// JWT token yaratish
		const token = jwt.sign(
			{ id: user.id, fullName: user.fullName, phone: user.phone },
			JWT_SECRET,
			{ expiresIn: '1h' }
		);

		return res.status(200).json({ message: 'Login successful', token });
	}

	// Tokenni tekshirish (Middleware uchun)
	static verifyToken(req: Request, res: Response, next: Function) {
		const token = req.headers.authorization?.split(' ')[1]; // Bearer tokenni olish

		if (!token) {
			return res
				.status(403)
				.json({ message: 'Access denied, no token provided' });
		}

		try {
			const decoded = jwt.verify(token, JWT_SECRET) as CustomJwtPayload;
			req.user = decoded; // Decoded ma'lumotni request'ga qo'shish
			return next();
		} catch (error) {
			return res.status(401).json({ message: 'Invalid or expired token' });
		}
	}
}
