type JSON = any| JSON[];

export interface Driver {
	id: number;
	fullName: string;
	phone: string;
	photoTexPassport: JSON;
	photoPassport: JSON;
	photoLicense: JSON;
	photoConfidencePassport: JSON;
	photoDriverLicense: JSON;
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
