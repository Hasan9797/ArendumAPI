import prisma from '@/config/prisma';
import { UserQueryDTO } from '@/dto/user/queryFillterDTO';
import { CreateUserDTO, PaginatedUsers, UpdateUserDTO, User } from '@/Interfaces/user.interface';

export const getUsers = async (query: UserQueryDTO): Promise<PaginatedUsers> => {
	const { page, limit, sort, filters } = query;

	const skip = (page - 1) * limit;

	try {
		const where: any = {};

		filters.forEach((filter) => {
			const { column, operator, value } = filter;

			if (operator === 'between' && column === 'created_at') {
				const [startDate, endDate] = value.split('_');
				where[column] = {
					gte: new Date(startDate), // katta yoki teng
					lte: new Date(endDate),   // kichik yoki teng
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

		const users = await prisma.user.findMany({
			where,
			orderBy,
			skip,
			take: limit,
		});

		const total = await prisma.user.count({ where });

		return {
			data: users,
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

const createUser = async (newUser: CreateUserDTO) => {
	return await prisma.user.create({
		data: newUser,
	});
};

const getUser = async (id: number) => {
	return await prisma.user.findUnique({
		where: { id },
	});
};

const deleteUserById = async (id: number) => {
	return await prisma.user.delete({
		where: { id },
	});
};

const updateUserById = async (
	id: number,
	userData: UpdateUserDTO
): Promise<User | null> => {
	try {
		const updatedUser = await prisma.user.update({
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
	getUsers,
	createUser,
	getUser,
	deleteUserById,
	updateUserById,
}