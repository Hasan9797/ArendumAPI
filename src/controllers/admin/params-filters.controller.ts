import { QueryDTO } from '@/dto/queryFillterDTO';
import { RequestCustom } from '@/interfaces/authenticated-request.interface';
import paramsSettingsService from '@/services/params-settings.service';
import { Request, Response } from 'express';

const getAll = async (req: RequestCustom, res: Response): Promise<void> => {
  const query: QueryDTO = {
    page: parseInt(req.query.page as string) || 1,
    limit: parseInt(req.query.limit as string) || 10,
    filters: req.body.filters || [],
    sort: req.body.sort || { column: 'id', value: 'desc' },
  };

  try {
    const result = await paramsSettingsService.getParamsFilters(query);
    res.status(200).json({
      success: true,
      data: result.data,
      pagination: result.pagination,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message:
        error instanceof Error ? error.message : 'Failed to fetch category',
    });
  }
};

const getById = async (req: RequestCustom, res: Response): Promise<void> => {
  try {
    const machineParams = await paramsSettingsService.getById(
      parseInt(req.params.id)
    );
    res.status(200).json(machineParams);
  } catch (error) {
    console.error('Error fetching machine params:', error);
    res.status(500).json({
      success: false,
      message:
        error instanceof Error
          ? error.message
          : 'Failed to fetch machine params',
    });
  }
};

const create = async (req: Request, res: Response): Promise<void> => {
  try {
    const params = await paramsSettingsService.createParamsFilter(req.body);
    res.status(201).json(params);
  } catch (error) {
    console.error('Error fetching machin params:', error);
    res.status(500).json({
      success: false,
      message:
        error instanceof Error
          ? error.message
          : 'Failed to fetch machin params',
    });
  }
};

const update = async (req: Request, res: Response): Promise<void> => {
  try {
    const updateMachineParams = await paramsSettingsService.updateParamsFilter(
      parseInt(req.params.id),
      req.body
    );
    res.status(200).json(updateMachineParams);
  } catch (error) {
    res.status(500).json({
      success: false,
      message:
        error instanceof Error
          ? error.message
          : 'Failed to fetch update machine params',
    });
  }
};

const distroy = async (req: Request, res: Response): Promise<void> => {
  try {
    const machineParams = await paramsSettingsService.deleteParamsFilter(
      parseInt(req.params.id)
    );
    res.status(200).json(machineParams);
  } catch (error) {
    res.status(500).json({
      success: false,
      message:
        error instanceof Error
          ? error.message
          : 'Failed to fetch machine params',
    });
  }
};

export default {
  getAll,
  getById,
  create,
  update,
  distroy,
};
