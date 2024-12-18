import { QueryDTO } from '@/dto/query/queryFillterDTO';
import {
	CreateCategoryDTO,
	UpdateCategoryDTO,
} from '@/dto/user/categoryCreateDTO';

import { Category, PaginatedCategory } from '@/Interfaces/category.interface';
import categoryRepo from '@/repositories/category.repo';

const getCategories = async (query: QueryDTO): Promise<PaginatedCategory> => {
	return await categoryRepo.getCategories(query);
};

const getCategoryById = async (id: number): Promise<Category | null> => {
	return await categoryRepo.getCategoryById(id);
};

const createCategory = async (data: CreateCategoryDTO): Promise<Category> => {
	return await categoryRepo.createCategory(data);
};

const updateCategory = async (
	id: number,
	data: UpdateCategoryDTO
): Promise<Category | null> => {
	return await categoryRepo.updateCategoryById(id, data);
};

const deleteCategory = async (id: number): Promise<Category> => {
	return await categoryRepo.deleteCategoryById(id);
};

export default {
	getCategories,
	getCategoryById,
	createCategory,
	updateCategory,
	deleteCategory,
};
