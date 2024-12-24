import { QueryDTO } from '@/dto/queryFillterDTO';
import { Client, PaginatedClients } from '@/interfaces/client.interface';
import { CreateClientDTO, UpdateClientDTO } from '@/dto/clientDTO';
import clientRepository from '@/repositories/client.repo';

const getClients = async (query: QueryDTO): Promise<PaginatedClients> => {
  return await clientRepository.findAll(query);
};

const getClientById = async (id: number): Promise<Client | null> => {
  return await clientRepository.getById(id);
};

const createClient = async (data: CreateClientDTO): Promise<Client> => {
  return await clientRepository.createClient(data);
};

const updateClient = async (
  id: number,
  data: UpdateClientDTO
): Promise<Client | null> => {
  return await clientRepository.updateClientById(id, data);
};

const deleteClient = async (id: number) => {
  return await clientRepository.deleteClientById(id);
};

export default {
  getClients,
  getClientById,
  createClient,
  updateClient,
  deleteClient,
};
