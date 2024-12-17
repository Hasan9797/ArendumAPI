export interface User {
  id: number;
  full_name: string;
  phone: string;
  role: number;
  created_at: Date;
  updated_at: Date;
}

export interface CreateUserDTO {
  full_name: string;
  phone: string;
  role: number;
}

export interface UpdateUserDTO {
  full_name?: string;
  phone?: string;
  role?: number;
}

export interface PaginatedUsers {
  data: User[],
  pagination: {
    totalUsers: number,
    totalPages: number,
    currentPage: number,
    pageSize: number,
  },
}
