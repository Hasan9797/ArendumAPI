export interface Category {
    id: number;
    title: string;
    logo: string;
    createdAt: Number;
    updatedAt: Number;
  }
  
  export interface CreateCategoryDTO {
    title: string;
    logo: string;
  }
  
  export interface UpdateCategoryDTO {
    title?: string;
    logo?: string;
  }
  
  export interface PaginatedCategory {
    data: Category[],
    pagination: {
      totalUsers: number,
      totalPages: number,
      currentPage: number,
      pageSize: number,
    },
  }
  