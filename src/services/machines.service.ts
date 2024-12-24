import { QueryDTO } from '@/dto/query-fillterDTO';
import { CreateMachineDTO, UpdateMachineDTO } from '@/dto/machinesDTO';

import { Macchines, PaginatedMacchines } from '@/interfaces/machines.interface';
import categoryRepo from '@/repositories/machines.repo';

const getMachines = async (query: QueryDTO): Promise<PaginatedMacchines> => {
  return await categoryRepo.getMachines(query);
};

const getMachineById = async (id: number): Promise<Macchines | null> => {
  return await categoryRepo.getMachineById(id);
};

const createMachine = async (data: CreateMachineDTO): Promise<Macchines> => {
  return await categoryRepo.createMachine(data);
};

const updateMachine = async (
  id: number,
  data: UpdateMachineDTO
): Promise<Macchines | null> => {
  return await categoryRepo.updateMachineById(id, data);
};

const deleteMachine = async (id: number): Promise<any | boolean> => {
  return await categoryRepo.deleteMachineById(id);
};

export default {
  getMachines,
  getMachineById,
  createMachine,
  updateMachine,
  deleteMachine,
};
