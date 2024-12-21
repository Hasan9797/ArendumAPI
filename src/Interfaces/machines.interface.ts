export interface Macchines {
    id: number;
    title: string;
    img: string;
    createdAt: Number;
    updatedAt: Number;
  }
  
  export interface PaginatedMacchines {
    data: Macchines[],
    pagination: {
      totalUsers: number,
      totalPages: number,
      currentPage: number,
      pageSize: number,
    },
  }
  