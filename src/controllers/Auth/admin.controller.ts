import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import { CustomJwtPayload } from '@/Interfaces/CustomJwtPayload.Interface';
import prisma from '@/config/prisma';

const JWT_SECRET = 'mySecretTsKey';

export class AuthController {
	// Foydalanuvchi login
	static async login(req: Request, res: Response) {
		const { login, password } = req.body;

		if (!login || !password) {
			return res.status(400).json({ message: 'phoneNumber are required' });
		}

		// Foydalanuvchini topish
		const user = await prisma.user.findUnique({
			where: { login: login },
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

	// Refresh Token
	static async refreshToken(req: Request, res: Response) {
		const { refreshToken } = req.body;

		if (!refreshToken) {
			return res.status(400).json({ message: 'Refresh token is required' });
		}

		// Refresh tokenni tekshirish
		if (!REFRESH_TOKENS.includes(refreshToken)) {
			return res.status(403).json({ message: 'Invalid refresh token' });
		}

		try {
			const decoded = jwt.verify(refreshToken, JWT_REFRESH_SECRET);
			const user = {
				id: (decoded as any).id,
				username: (decoded as any).username,
			};

			// Yangi Access token yaratish
			const newAccessToken = jwt.sign(user, JWT_SECRET, { expiresIn: '15m' });

			return res.status(200).json({
				message: 'Access token refreshed',
				accessToken: newAccessToken,
			});
		} catch (error) {
			return res
				.status(403)
				.json({ message: 'Invalid or expired refresh token' });
		}
	}

	// Logout
	static async logout(req: Request, res: Response) {
		const { refreshToken } = req.body;

		if (!refreshToken) {
			return res.status(400).json({ message: 'Refresh token is required' });
		}

		// Refresh tokenni o'chirish
		const index = REFRESH_TOKENS.indexOf(refreshToken);
		if (index > -1) {
			REFRESH_TOKENS.splice(index, 1);
		}

		return res.status(200).json({ message: 'Logged out successfully' });
	}
}
