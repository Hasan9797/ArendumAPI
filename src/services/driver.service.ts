import { QueryDTO } from '../dto/query-fillterDTO';
import { CreateDriverDTO, UpdateDriverDTO } from '../dto/driverDTO';
import { Driver, PaginatedDrivers } from '../interfaces/driver.interface';
import driverRepository from '../repositories/driver.repo';

const getAll = async (query: QueryDTO): Promise<PaginatedDrivers> => {
  return await driverRepository.findAll(query);
};

const getById = async (id: number): Promise<Driver | null> => {
  return await driverRepository.getById(id);
};

const create = async (data: CreateDriverDTO): Promise<Driver> => {
  return await driverRepository.create(data);
};

const updateById = async (
  id: number,
  data: UpdateDriverDTO
): Promise<Driver | null> => {
  return await driverRepository.updateById(id, data);
};

const deleteById = async (id: number) => {
  return await driverRepository.deleteById(id);
};

export default {
  getAll,
  getById,
  create,
  updateById,
  deleteById,
};
