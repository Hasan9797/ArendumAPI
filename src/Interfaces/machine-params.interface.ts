type JSON = any | JSON[];

export interface MachineParams {
  name: string;
  machineId: number;
  params: JSON;
}

export interface PaginatedParams {
  data: MachineParams[];
  pagination: {
    totalUsers: number;
    totalPages: number;
    currentPage: number;
    pageSize: number;
  };
}
