import { CreateMachineDTO, UpdateMachineDTO } from '../dto/machinesDTO';
import { QueryDTO } from '../dto/query-fillterDTO';

import { Macchines, PaginatedMacchines } from '../interfaces/machines.interface';
import machinesRepo from '../repositories/machines.repo';

const getParamsFilters = async (
  query: QueryDTO
): Promise<PaginatedMacchines> => {
  return await machinesRepo.getMachines(query);
};

const getById = async (id: number): Promise<Macchines | null> => {
  return await machinesRepo.getMachineById(id);
};

const createParamsFilter = async (
  data: CreateMachineDTO
): Promise<Macchines> => {
  return await machinesRepo.createMachine(data);
};

const updateParamsFilter = async (
  id: number,
  data: UpdateMachineDTO
): Promise<Macchines | null> => {
  return await machinesRepo.updateMachineById(id, data);
};

const deleteParamsFilter = async (id: number): Promise<Macchines | null> => {
  return await machinesRepo.deleteMachineById(id);
};

export default {
  getParamsFilters,
  getById,
  createParamsFilter,
  updateParamsFilter,
  deleteParamsFilter,
};
