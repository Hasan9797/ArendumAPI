import { CreateMachineDTO, UpdateMachineDTO } from '@/dto/machinesDTO';
import { QueryDTO } from '@/dto/queryFillterDTO';

import { Macchines, PaginatedMacchines } from '@/Interfaces/machines.interface';
import machinesRepo from '@/repositories/machines.repo';

const getCategories = async (query: QueryDTO): Promise<PaginatedMacchines> => {
  return await machinesRepo.getMachines(query);
};

const getCategoryById = async (id: number): Promise<Macchines | null> => {
  return await machinesRepo.getMachineById(id);
};

const createCategory = async (data: CreateMachineDTO): Promise<Macchines> => {
  return await machinesRepo.createMachine(data);
};

const updateCategory = async (
  id: number,
  data: UpdateMachineDTO
): Promise<Macchines | null> => {
  return await machinesRepo.updateMachineById(id, data);
};

const deleteCategory = async (id: number): Promise<Macchines | null> => {
  return await machinesRepo.deleteMachineById(id);
};

export default {
  getCategories,
  getCategoryById,
  createCategory,
  updateCategory,
  deleteCategory,
};
