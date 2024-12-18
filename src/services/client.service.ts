import userRepository from '@/repositories/user.repo';
import { QueryDTO } from '@/dto/query/queryFillterDTO';
import { CreateClientDTO, UpdateClientDTO } from '@/dto/user/clientCreateDTO';
import { Client, PaginatedClients } from '@/Interfaces/client.Interface';

const getClients = async (query: QueryDTO): Promise<PaginatedClients> => {
	return await userRepository.getUsers(query);
};

const getClientById = async (id: number): Promise<Client | null> => {
	return await userRepository.getUser(id);
};

const createClient = async (data: CreateClientDTO): Promise<Client> => {
	return await userRepository.createUser(data);
};

const updateClient = async (
	id: number,
	data: UpdateClientDTO
): Promise<Client | null> => {
	return await userRepository.updateUserById(id, data);
};

const deleteClient = async (id: number) => {
	return await userRepository.deleteUserById(id);
};

export default {
	getClients,
	getClientById,
	createClient,
	updateClient,
	deleteClient,
};
