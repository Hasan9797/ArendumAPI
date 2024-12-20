export interface CreateClientDTO {
	fullName: string;
	phone: string;
}

export interface UpdateClientDTO {
	fullName?: string;
	phone?: string;
}
