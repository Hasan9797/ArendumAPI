export interface User {
  id: number;
  fullName: string;
  phone: string;
  role: number;
  createdAt: Number;
  updatedAt: Number;
}

export interface CreateUserDTO {
  fullName: string;
  phone: string;
  role: number;
  photoTexPassport: JSON;
  photoUserPassport: JSON;
  photoLicense: JSON;
  photoConfidencePassport: JSON;
  photoDriverLicense: JSON;
}

export interface UpdateUserDTO {
  fullName?: string;
  phone?: string;
  role?: number;
  photoTexPassport?: JSON;
  photoUserPassport?: JSON;
  photoLicense?: JSON;
  photoConfidencePassport?: JSON;
  photoDriverLicense?: JSON;
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
