import { Router } from 'express';

import categoryController from '@/controllers/admin/category.controller';
import { authentication, authorization } from '../middleware/auth.middleware';
import { ROLES } from '@/constants/user-role.constant';

const router = Router();

router.get('/', authentication, categoryController.getCategory);

router.post('/add', authentication, categoryController.createCategory);

router.put('/update/:id', categoryController.updateCategory);

router.delete('/delete/:id', categoryController.deleteCategory);

export default router;
