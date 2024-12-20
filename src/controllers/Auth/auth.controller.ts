import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import prisma from '@/config/prisma';
import { generateToken } from '@/utils/auth.util';

const JWT_SECRET = process.env.JWT_SECRET ?? "secret";
const REFRESH_SECRET = process.env.REFRESH_SECRET || 'refresh';

// Login
const login = async (req: Request, res: Response): Promise<any> => {
	const { login, password } = req.body;

	if (!login || !password) {
		return res.status(400).json({ message: 'phoneNumber are required' });
	}

	const user = await prisma.user.findUnique({
		where: { login: login },
	});

	if (!user) {
		return res.status(401).json({ message: 'Invalid credentials' });
	}

	const isMatch = await bcrypt.compare(password, user.password);

	if (!isMatch) {
		return res.status(401).json({ message: 'Invalid credentials' });
	}

	const token = generateToken({
		id: user.id,
		fullName: user.fullName,
		phone: user.phone,
		role: user.role,
	})

	return res.status(200).json({ message: 'Login successful', token: "Barere: " + token });
}



export const refreshToken = async (
	req: Request,
	res: Response
): Promise<void> => {
	const { refreshToken } = req.body;

	if (!refreshToken) {
		res.status(403).json({ message: 'No refresh token provided' });
		return;
	}

	try {
		const decoded = jwt.verify(refreshToken, REFRESH_SECRET) as { id: number };

		// const tokenRecord = await prisma.token.findUnique({
		//   where: { token: refreshToken },
		// });

		// if (!tokenRecord) {
		//   res.status(403).json({ message: 'Invalid refresh token' });
		//   return;
		// }

		// Yangi access token yaratish
		const accessToken = generateToken(
			{ id: decoded.id },
			JWT_SECRET,
		);

		res.status(200).json({ accessToken });
	} catch (error) {
		res.status(403).json({ message: 'Invalid or expired refresh token' });
	}
};


// Logout
const logout = async (req: Request, res: Response): Promise<any> => {
	try {
		const token = req.headers.authorization?.split(' ')[1];

		if (!token) {
			return res.status(400).json({ message: 'No token provided' });
		}

		return res.status(200).json({ message: 'Logout successful' });
	} catch (error) {
		console.error('Logout error:', error);
		return res.status(500).json({ message: 'Internal server error' });
	}
};

export default { login, refreshToken, logout };