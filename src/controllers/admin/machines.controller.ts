import { Request, Response } from 'express';
import { QueryDTO } from '@/dto/queryFillterDTO';
import machinesService from '@/services/machines.service';
import { RequestCustom } from '@/interfaces/authenticated-request.interface';

const getAll = async (req: RequestCustom, res: Response): Promise<void> => {
  const query: QueryDTO = {
    page: parseInt(req.query.page as string) || 1,
    limit: parseInt(req.query.limit as string) || 10,
    filters: req.body.filters || [],
    sort: req.body.sort || { column: 'id', value: 'desc' },
  };

  try {
    const result = await machinesService.getMachines(query);
    res.status(200).json({
      success: true,
      data: result.data,
      pagination: result.pagination,
    });
  } catch (error) {
    console.error('Error fetching machines:', error);
    res.status(500).json({
      success: false,
      message:
        error instanceof Error ? error.message : 'Failed to fetch machines',
    });
  }
};

const getById = async (req: RequestCustom, res: Response): Promise<void> => {
  try {
    const machine = await machinesService.getMachineById(
      parseInt(req.params.id)
    );
    res.status(200).json(machine);
  } catch (error) {
    console.error('Error fetching machine:', error);
    res.status(500).json({
      success: false,
      message:
        error instanceof Error ? error.message : 'Failed to fetch machine',
    });
  }
};

const create = async (req: Request, res: Response): Promise<void> => {
  try {
    const machine = await machinesService.createMachine(req.body);
    res.status(201).json(machine);
  } catch (error) {
    console.error('Error fetching machine:', error);
    res.status(500).json({
      success: false,
      message:
        error instanceof Error ? error.message : 'Failed to fetch machine',
    });
  }
};

const update = async (req: Request, res: Response): Promise<void> => {
  try {
    const machine = await machinesService.updateMachine(
      parseInt(req.params.id),
      req.body
    );
    res.status(200).json(machine);
  } catch (error) {
    console.error('Error fetching machine:', error);
    res.status(500).json({
      success: false,
      message:
        error instanceof Error ? error.message : 'Failed to fetch machine',
    });
  }
};

const distroy = async (req: Request, res: Response): Promise<void> => {
  try {
    const machine = await machinesService.deleteMachine(
      parseInt(req.params.id)
    );
    res.status(200).json(machine);
  } catch (error) {
    console.error('Error fetching machine:', error);
    res.status(500).json({
      success: false,
      message:
        error instanceof Error ? error.message : 'Failed to fetch machine',
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
