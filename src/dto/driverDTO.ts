export interface CreateDriverDTO {
	fullName: string;
	phone: string;
	photoTexPassport: JSON;
	photoPassport: JSON;
	photoLicense: JSON;
	photoConfidencePassport: JSON;
	photoDriverLicense: JSON;
}

export interface UpdateDriverDTO {
	fullName?: string;
	phone?: string;
	photoTexPassport?: JSON;
	photoPassport?: JSON;
	photoLicense?: JSON;
	photoConfidencePassport?: JSON;
	photoDriverLicense?: JSON;
}
