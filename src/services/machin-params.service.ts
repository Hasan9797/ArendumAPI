import { QueryDTO } from '@/dto/queryFillterDTO';
import {
  CreateMachineParamsDTO,
  UpdateMachineParamsDTO,
} from '@/dto/machineParamsDTO';

import {
  PaginatedParams,
  MachineParams,
} from '@/Interfaces/machineParams.interface';

import machineParamsRepo from '@/repositories/machineParams.repo';

const getCategories = async (query: QueryDTO): Promise<PaginatedParams> => {
  return await machineParamsRepo.getAll(query);
};

const getCategoryById = async (id: number): Promise<MachineParams | null> => {
  return await machineParamsRepo.getById(id);
};

const createCategory = async (
  data: CreateMachineParamsDTO
): Promise<MachineParams> => {
  return await machineParamsRepo.create(data);
};

const updateCategory = async (
  id: number,
  data: UpdateMachineParamsDTO
): Promise<MachineParams | null> => {
  return await machineParamsRepo.updateById(id, data);
};

const deleteCategory = async (id: number): Promise<MachineParams> => {
  return await machineParamsRepo.distroy(id);
};

const filtersMachineParams = async (machinId: number): Promise<any> => {
  return [];
};

export default {
  getCategories,
  getCategoryById,
  createCategory,
  updateCategory,
  deleteCategory,
  filtersMachineParams,
};
