export interface CreateUserDTO {
	fullName: string;
	phone: string;
	login: string;
	password: string;
	role: number;
}

export interface UpdateUserDTO {
	fullName?: string;
	phone?: string;
	login?: string;
	password?: string;
	role?: number;
}
