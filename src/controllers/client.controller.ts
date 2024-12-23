import { QueryDTO } from '../dto/query-fillterDTO';
import clientService from '../services/client.service';
import { Request, Response } from 'express';

const getAll = async (req: Request, res: Response): Promise<any> => {
  const query: QueryDTO = {
    page: parseInt(req.query.page as string) || 1,
    limit: parseInt(req.query.limit as string) || 10,
    filters: req.body.filters || [],
    sort: req.body.sort || { column: 'id', value: 'desc' },
  };

  try {
    const result = await clientService.getClients(query);
    res.status(200).json({
      success: true,
      data: result.data,
      pagination: result.pagination,
    });
  } catch (error) {
    console.error('Error fetching users:', error);
    res.status(500).json({
      success: false,
      message: error instanceof Error ? error.message : 'Failed to fetch users',
    });
  }
};

const getById = async (req: Request, res: Response): Promise<any> => {
  try {
    const user = await clientService.getClientById(parseInt(req.params.id));
    res.status(200).json(user);
  } catch (error) {
    console.error('Error fetching users:', error);
    res.status(500).json({
      success: false,
      message: error instanceof Error ? error.message : 'Failed to fetch users',
    });
  }
};

const create = async (req: Request, res: Response): Promise<any> => {
  try {
    const user = await clientService.createClient(req.body);
    res.status(201).json(user);
  } catch (error) {
    console.error('Error fetching users:', error);
    res.status(500).json({
      success: false,
      message: error instanceof Error ? error.message : 'Failed to fetch users',
    });
  }
};

const update = async (req: Request, res: Response): Promise<any> => {
  try {
    const user = await clientService.updateClient(
      parseInt(req.params.id),
      req.body
    );
    res.status(200).json(user);
  } catch (error) {
    console.error('Error fetching users:', error);
    res.status(500).json({
      success: false,
      message: error instanceof Error ? error.message : 'Failed to fetch users',
    });
  }
};

const distroy = async (req: Request, res: Response) => {};

export default {
  getAll,
  getById,
  create,
  update,
  distroy,
};
