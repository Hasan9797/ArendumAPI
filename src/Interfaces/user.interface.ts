export interface User {
	id: number;
	fullName: string;
	phone: string;
	login: string;
	password: string;
	role: number;
	createdAt: Number;
	updatedAt: Number;
}

export interface PaginatedUsers {
	data: User[];
	pagination: {
		totalUsers: number;
		totalPages: number;
		currentPage: number;
		pageSize: number;
	};
}
