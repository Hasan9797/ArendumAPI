export interface Category {
    id: number;
    title: string;
    img: string;
    createdAt: Number;
    updatedAt: Number;
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
  