import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import { CustomJwtPayload } from '@/Interfaces/CustomJwtPayload.Interface';
import prisma from '@/config/prisma';
import { sendSms, saveSmsCode, getSmsCode, deleteSmsCode } from '@/services/sms.service';
import { generateToken } from '@/utils/auth.util';

const JWT_SECRET = process.env.JWT_SECRET ?? 'secret';

const SMS_CODE_EXPIRATION = 5 * 60 * 1000; // 5 daqiqa

const login = async (req: Request, res: Response): Promise<any> => {
	const { phoneNumber, mobileHash } = req.body;

	if (!phoneNumber) {
		return res.status(400).json({ message: 'phoneNumber is required', success: false });
	}

	const user = await prisma.user.findUnique({
		where: { phone: phoneNumber },
	});

	if (!user) {
		return res.status(401).json({ message: 'Invalid credentials', success: false });
	}

	// SMS code generation
	const smsCode = 777777; // Math.floor(100000 + Math.random() * 900000).toString();
	const expiresAt = Date.now() + SMS_CODE_EXPIRATION;

	// Save the SMS code temporarily
	await saveSmsCode(phoneNumber, smsCode, expiresAt);

	// Send SMS code
	await sendSms(phoneNumber, `Your login code is: ${smsCode}`, mobileHash);

	return res.status(200).json({ message: 'SMS code sent successfully', success: true });
}


const verifySmsCode = async (req: Request, res: Response): Promise<any> => {
	const { phoneNumber, code } = req.body;
	const savedCode = await getSmsCode(phoneNumber);

	if (!savedCode) {
		throw new Error('SMS code not found or expired');
	}

	if (savedCode != code) {
		throw new Error('Invalid SMS code');
	}

	// Delete the SMS code temporarily
	await deleteSmsCode(phoneNumber);

	const user = await prisma.user.findUnique({
		where: { phone: phoneNumber },
	});

	if (!user) {
		return res.status(401).json({ message: 'Invalid credentials' });
	}

	const token = generateToken({
		id: user.id,
		fullName: user.fullName,
		phone: user.phone,
		role: user?.role || 10,
	})

	return res.status(200).json({ message: 'Verification successful', token: "Barere: " + token });
};


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
			role: user?.role || 10,
		});

		return res.status(200).json({ message: 'Token refreshed', token: newToken });
	} catch (error) {
		return res.status(401).json({ message: 'Invalid or expired token' });
	}
};

export default { login, verifySmsCode, refreshToken };