import userRepository from '../repositories/user.repo';
import { User, CreateUserDTO, UpdateUserDTO, PaginatedUsers } from '../Interfaces/user.interface';
import { UserQueryDTO } from '../dto/user/queryFillterDTO';

const getUsers = async (query: UserQueryDTO): Promise<PaginatedUsers> => {
  return await userRepository.getUsers(query);
};

const getUserById = async (id: number): Promise<User | null> => {
  return await userRepository.getUser(id);
};

const createUser = async (data: CreateUserDTO): Promise<User> => {
  return await userRepository.createUser(data);
};

const updateUser = async (id: number, data: UpdateUserDTO): Promise<User | null> => {
  return await userRepository.updateUserById(id, data);
};

const deleteUser = async (id: number): Promise<User> => {
  return await userRepository.deleteUserById(id);
};

export default {
  getUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
}