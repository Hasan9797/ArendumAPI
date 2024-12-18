export interface CreateDriverDTO {
	fullName: string;
	phone: string;
	role: number;
	photoTexPassport: JSON;
	photoUserPassport: JSON;
	photoLicense: JSON;
	photoConfidencePassport: JSON;
	photoDriverLicense: JSON;
}

export interface UpdateDriverDTO {
	fullName?: string;
	phone?: string;
	role?: number;
	photoTexPassport?: JSON;
	photoUserPassport?: JSON;
	photoLicense?: JSON;
	photoConfidencePassport?: JSON;
	photoDriverLicense?: JSON;
}
