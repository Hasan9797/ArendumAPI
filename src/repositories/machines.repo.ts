import prisma from '@/config/prisma';
import { QueryDTO } from '@/dto/query/queryFillterDTO';
import {
	CreateCategoryDTO,
	UpdateCategoryDTO,
} from '@/dto/user/categoryCreateDTO';
import { Category, PaginatedCategory } from '@/Interfaces/category.interface';

export const getCategories = async (
	query: QueryDTO
): Promise<PaginatedCategory> => {
	const { page, limit, sort, filters } = query;

	const skip = (page - 1) * limit;

	try {
		const where: any = {};

		filters.forEach(filter => {
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

		const categories = await prisma.machines.findMany({
			where,
			orderBy,
			skip,
			take: limit,
		});

		const total = await prisma.machines.count({ where });

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

const createCategory = async (newUser: CreateCategoryDTO) => {
	return await prisma.machines.create({
		data: newUser,
	});
};

const getCategoryById = async (id: number) => {
	return await prisma.machines.findUnique({
		where: { id },
	});
};

const deleteCategoryById = async (id: number) => {
	return await prisma.machines.delete({
		where: { id },
	});
};

const updateCategoryById = async (
	id: number,
	categoryData: UpdateCategoryDTO
): Promise<Category | null> => {
	try {
		const updatedUser = await prisma.machines.update({
			where: { id },
			data: categoryData,
		});
		return updatedUser;
	} catch (error) {
		console.error('Error updating user:', error);
		return null;
	}
};

export default {
	getCategories,
	createCategory,
	getCategoryById,
	deleteCategoryById,
	updateCategoryById,
};
