import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import { CustomJwtPayload } from '@/Interfaces/CustomJwtPayload.Interface';
import prisma from '@/config/prisma';
import { generateToken } from '@/utils/auth.util';

const JWT_SECRET = process.env.JWT_SECRET ?? "secret";

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

// Refresh Token
const refreshToken = async (req: Request, res: Response): Promise<any> => {
	const token = req.headers.authorization?.split(' ')[1];

	if (!token) {
		return res
			.status(403)
			.json({ message: 'Access denied, no token provided' });
	}

	try {
		const decoded = jwt.verify(token, JWT_SECRET) as CustomJwtPayload;
		const user = await prisma.user.findUnique({
			where: { id: decoded.id },
		});

		if (!user) {
			return res.status(401).json({ message: 'Invalid credentials' });
		}

		const newToken = generateToken({
			id: user.id,
			fullName: user.fullName,
			phone: user.phone,
			role: user.role,
		});

		return res.status(200).json({ message: 'Token refreshed', token: "Barere: " + newToken });
	} catch (error) {
		return res.status(401).json({ message: 'Invalid or expired token' });
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