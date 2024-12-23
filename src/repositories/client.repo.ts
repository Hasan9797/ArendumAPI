import prisma from '../config/prisma';
import { QueryDTO } from '../dto/query-fillterDTO';
import { CreateClientDTO, UpdateClientDTO } from '../dto/clientDTO';
import { PaginatedClients, Client } from '../interfaces/client.interface';

export const findAll = async (query: QueryDTO): Promise<PaginatedClients> => {
  const { page, limit, sort, filters } = query;

  const skip = (page - 1) * limit;

  try {
    const where: Record<string, any> = {};

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

    const clients = await prisma.client.findMany({
      where,
      orderBy,
      skip,
      take: limit,
    });

    const total = await prisma.client.count({ where });

    return {
      data: clients,
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

const createClient = async (newClient: CreateClientDTO) => {
  return await prisma.client.create({
    data: newClient,
  });
};

const getById = async (id: number) => {
  return await prisma.client.findUnique({
    where: { id },
  });
};

const deleteClientById = async (id: number) => {
  return await prisma.client.delete({
    where: { id },
  });
};

const updateClientById = async (
  id: number,
  userData: UpdateClientDTO
): Promise<Client | null> => {
  try {
    const updatedUser = await prisma.client.update({
      where: { id },
      data: userData,
    });
    return updatedUser;
  } catch (error) {
    console.error('Error updating user:', error);
    return null;
  }
};

export default {
  findAll,
  getById,
  createClient,
  updateClientById,
  deleteClientById,
};
