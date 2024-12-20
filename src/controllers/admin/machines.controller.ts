import { Request, Response } from 'express';
import { QueryDTO } from '@/dto/queryFillterDTO';
import machinesService from '@/services/machines.service';
import { RequestCustom } from '@/Interfaces/authenticatedRequest.interface';

const getCategory = async (
	req: RequestCustom,
	res: Response
): Promise<void> => {
	const query: QueryDTO = {
		page: parseInt(req.query.page as string) || 1,
		limit: parseInt(req.query.limit as string) || 10,
		filters: req.body.filters || [],
		sort: req.body.sort || { column: 'id', value: 'desc' },
	};

	try {
		const result = await machinesService.getCategories(query);
		res.status(200).json({
			success: true,
			data: result.data,
			pagination: result.pagination,
		});
	} catch (error) {
		console.error('Error fetching category:', error);
		res.status(500).json({
			success: false,
			message:
				error instanceof Error ? error.message : 'Failed to fetch category',
		});
	}
};

const getCategoryById = async (
	req: RequestCustom,
	res: Response
): Promise<void> => {
	try {
		const category = await machinesService.getCategoryById(
			parseInt(req.params.id)
		);
		res.status(200).json(category);
	} catch (error) {
		console.error('Error fetching categories:', error);
		res.status(500).json({
			success: false,
			message:
				error instanceof Error ? error.message : 'Failed to fetch category',
		});
	}
};

const createCategory = async (req: Request, res: Response): Promise<void> => {
	try {
		const category = await machinesService.createCategory(req.body);
		res.status(201).json(category);
	} catch (error) {
		console.error('Error fetching category:', error);
		res.status(500).json({
			success: false,
			message:
				error instanceof Error ? error.message : 'Failed to fetch category',
		});
	}
};

const updateCategory = async (req: Request, res: Response): Promise<void> => {
	try {
		const category = await machinesService.updateCategory(
			parseInt(req.params.id),
			req.body
		);
		res.status(200).json(category);
	} catch (error) {
		console.error('Error fetching category:', error);
		res.status(500).json({
			success: false,
			message:
				error instanceof Error ? error.message : 'Failed to fetch category',
		});
	}
};

const deleteCategory = async (req: Request, res: Response): Promise<void> => {
	try {
		const category = await machinesService.deleteCategory(
			parseInt(req.params.id)
		);
		res.status(200).json(category);
	} catch (error) {
		console.error('Error fetching category:', error);
		res.status(500).json({
			success: false,
			message:
				error instanceof Error ? error.message : 'Failed to fetch category',
		});
	}
};

export default {
	getCategory,
	getCategoryById,
	createCategory,
	updateCategory,
	deleteCategory,
};
