import userRepository from '@/repositories/user.repo';
import bcrypt from 'bcryptjs';
import { User, PaginatedUsers } from '@/Interfaces/user.interface';
import { QueryDTO } from '@/dto/queryFillterDTO';
import { CreateUserDTO, UpdateUserDTO } from '@/dto/userDTO';

const getUsers = async (query: QueryDTO): Promise<PaginatedUsers> => {
  return await userRepository.getUsers(query);
};

const getUserById = async (id: number): Promise<User | null> => {
  return await userRepository.getUser(id);
};

const createUser = async (data: CreateUserDTO): Promise<User> => {
  const passwordHash = bcrypt.hashSync(data.password, 10);

  const newUser = { ...data, password: passwordHash };
  return await userRepository.createUser(newUser);
};

const updateUser = async (
  id: number,
  data: UpdateUserDTO
): Promise<User | null> => {
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
};
