import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import prisma from '@/config/prisma';
import { generateAccessToken, generateRefreshAccessToken } from '@/utils/auth.util';
import { CustomJwtPayload } from '@/Interfaces/CustomJwtPayload.Interface';

const JWT_SECRET = process.env.JWT_SECRET ?? "secret";
const JWT_REFRESH_SECRET = process.env.JWT_REFRESH_SECRET || 'refresh';

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
		return res.status(401).json({ message: 'Login or password invalid' });
	}

	const isMatch = await bcrypt.compare(password, user.password);

	if (!isMatch) {
		return res.status(401).json({ message: 'Invalid login or password' });
	}

	const accessToken = generateAccessToken({
		id: user.id,
		fullName: user.fullName,
		phone: user.phone,
		role: user.role,
	})

	const refreshToken = generateRefreshAccessToken({
		id: user.id,
		fullName: user.fullName,
		phone: user.phone,
		role: user.role,
	})
	const userToken: {token: string, userId: number, expire:string} = {
		token: refreshToken,
		userId: user.id,
		expire: "7d"
	}

	await prisma.userToken.create({data: userToken})

	return res.status(200).json({ message: 'Login successful', accessToken, refreshToken });
}


const refreshToken = async (req: Request, res: Response): Promise<any> => {
	const userRefreshToken = req.headers.authorization?.split(' ')[1];

	if (!userRefreshToken) {
		return res
			.status(403)
			.json({ message: 'Access denied, no userRefreshToken provided' });
	}

	try {
		const decoded = jwt.verify(userRefreshToken, JWT_REFRESH_SECRET) as CustomJwtPayload;

		const useruserRefreshToken = await prisma.userToken.findFirst({
			where: { token: userRefreshToken },
		});

		if (!useruserRefreshToken) {
			return res.status(401).json({ message: 'Invalid credentials' });
		}

		const newAccessToken = generateRefreshAccessToken(decoded);

		return res.status(200).json({ message: 'Token refreshed', accessToken: newAccessToken });
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