export interface CreateParamsFilterDTO {
  machineId: number;
  filterParams: JSON;
}

export interface UpdateParamsFilterDTO {
  machineId?: number;
  filterParams?: JSON;
}
