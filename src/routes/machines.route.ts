import { Router } from 'express';

import machinsController from '@/controllers/admin/machines.controller';
import { authentication, authorization } from '../middleware/auth.middleware';
import { ROLES } from '@/constants/user-role.constant';

const router = Router();

router.get('/', authentication, machinsController.getCategory);

router.post('/add', authorization([4]), machinsController.createCategory);

router.put('/update/:id', machinsController.updateCategory);

router.delete('/delete/:id', machinsController.deleteCategory);

export default router;
