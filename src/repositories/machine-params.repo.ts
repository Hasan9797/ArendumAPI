import prisma from '../config/prisma';
import {
  CreateMachineParamsDTO,
  UpdateMachineParamsDTO,
} from '../dto/machine-paramsDTO';

import { QueryDTO } from '../dto/query-fillterDTO';

import {
  MachineParams,
  PaginatedParams,
} from '../interfaces/machine-params.interface';

export const getAll = async (query: QueryDTO): Promise<PaginatedParams> => {
  const { page, limit, sort, filters } = query;

  const skip = (page - 1) * limit;

  try {
    const where: any = {};

    filters.forEach((filter) => {
      const { column, operator, value } = filter;

      if (operator === 'between' && column === 'created_at') {
        const [startDate, endDate] = value.split('_');
        where[column] = {
          gte: startDate,
          lte: endDate,
        };
      } else {
        if (operator === 'contains') {
          where[column] = { contains: value, mode: 'insensitive' };
        } else if (operator === 'equals') {
          where[column] = value;
        }
      }
    });

    const orderBy: any = sort?.column
      ? { [sort.column]: sort.value }
      : { id: 'desc' };

    const categories = await prisma.machineParams.findMany({
      where,
      orderBy,
      skip,
      take: limit,
    });

    const total = await prisma.machineParams.count({ where });

    return {
      data: categories,
      pagination: {
        totalUsers: total,
        totalPages: Math.ceil(total / limit),
        currentPage: page,
        pageSize: limit,
      },
    };
  } catch (error) {
    console.error('Error fetching users:', error);
    throw new Error('Failed to fetch users');
  }
};

const create = async (newUser: CreateMachineParamsDTO) => {
  return await prisma.machineParams.create({
    data: newUser,
  });
};

const getById = async (id: number) => {
  return await prisma.machineParams.findUnique({
    where: { id },
  });
};

const distroy = async (id: number): Promise<boolean | any> => {
  return await prisma.machineParams.delete({
    where: { id },
  });
};

const updateById = async (
  id: number,
  machineParamsData: UpdateMachineParamsDTO
): Promise<MachineParams | null> => {
  try {
    const updatedUser = await prisma.machineParams.update({
      where: { id },
      data: machineParamsData,
    });
    return updatedUser;
  } catch (error) {
    console.error('Error updating user:', error);
    return null;
  }
};

export default {
  getAll,
  create,
  getById,
  distroy,
  updateById,
};
