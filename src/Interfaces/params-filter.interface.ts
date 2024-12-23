type JSON = any | JSON[];

export interface ParamsFilter {
  machineId: number;
  filterParams: JSON;
}

export interface PaginatedParamsFilter {
  data: ParamsFilter[];
  pagination: {
    totalUsers: number;
    totalPages: number;
    currentPage: number;
    pageSize: number;
  };
}
