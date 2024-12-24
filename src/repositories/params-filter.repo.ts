import prisma from '../config/prisma';
import {
  CreateParamsFilterDTO,
  UpdateParamsFilterDTO,
} from '../dto/params-filterDTO';

import { QueryDTO } from '../dto/query-fillterDTO';

import {
  ParamsFilter,
  PaginatedParamsFilter,
} from '../interfaces/params-filter.interface';

export const getAll = async (
  query: QueryDTO
): Promise<PaginatedParamsFilter> => {
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

    const paramsFilter = await prisma.machineParamsFilters.findMany({
      where,
      orderBy,
      skip,
      take: limit,
    });

    const total = await prisma.machineParamsFilters.count({ where });

    return {
      data: paramsFilter,
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

const create = async (newUser: CreateParamsFilterDTO) => {
  return await prisma.machineParamsFilters.create({
    data: newUser,
  });
};

const getById = async (id: number) => {
  return await prisma.machineParamsFilters.findUnique({
    where: { id },
  });
};

const distroy = async (id: number): Promise<boolean | any> => {
  return await prisma.machineParamsFilters.delete({
    where: { id },
  });
};

const updateById = async (
  id: number,
  paramsFilterData: UpdateParamsFilterDTO
): Promise<ParamsFilter | null> => {
  try {
    const updatedUser = await prisma.machineParamsFilters.update({
      where: { id },
      data: paramsFilterData,
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
