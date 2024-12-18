export interface CreateClientDTO {
	fullName: string;
	phone: string;
	smsCode: number;
}

export interface UpdateClientDTO {
	fullName?: string;
	phone?: string;
	smsCode?: number;
}
