export interface Client {
	id: number;
	fullName: string;
	phone: string;
	createdAt: Number;
	updatedAt: Number;
}

export interface PaginatedClients {
	data: Client[];
	pagination: {
		totalUsers: number;
		totalPages: number;
		currentPage: number;
		pageSize: number;
	};
}
