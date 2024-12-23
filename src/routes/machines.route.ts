import { Router } from 'express';

import machinsController from '@/controllers/admin/machines.controller';
import { authentication, authorization } from '../middleware/auth.middleware';
import { ROLES } from '@/constants/user-role.constant';

const router = Router();

router.get('/', authentication, machinsController.getAll);

router.get('/by/:id', machinsController.getById);

router.post(
  '/add',
  authentication,
  authorization([1]),
  machinsController.create
);

router.put('/update/:id', machinsController.update);

router.delete('/delete/:id', machinsController.distroy);

export default router;
