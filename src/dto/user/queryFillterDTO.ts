// Pagination DTO
export interface PaginationDTO {
    page: number;
    limit: number;
}

// Sort DTO
export interface SortDTO {
    column: string;
    value: 'asc' | 'desc';
}

// Filter DTO
export interface FilterDTO {
    column: string;
    operator: string;
    value: any;
}

// User Query DTO: umumiy request uchun
export interface UserQueryDTO extends PaginationDTO {
    filters: FilterDTO[];
    sort: SortDTO;
}
