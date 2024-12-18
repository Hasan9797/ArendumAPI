export interface Driver {
	id: number;
	fullName: string;
	phone: string;
	login: string;
	role: number;
	createdAt: Number;
	updatedAt: Number;
}

export interface PaginatedDrivers {
	data: Driver[];
	pagination: {
		totalUsers: number;
		totalPages: number;
		currentPage: number;
		pageSize: number;
	};
}
