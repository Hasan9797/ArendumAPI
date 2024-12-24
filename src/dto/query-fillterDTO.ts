type Filter = {
  column: string;
  operator: 'equals' | 'contains' | 'between';
  value: string;
};

// User Query DTO: umumiy request uchun
export interface QueryDTO {
  page: number;
  limit: number;
  filters: Filter[];
  sort?: { column: string; value: 'asc' | 'desc' };
}
