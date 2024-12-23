import { Router } from 'express';

import { authentication, authorization } from '../middleware/auth.middleware';
import { ROLES } from '../constants/user-role.constant';
import paramsFiltersController from '../controllers/admin/params-filters.controller';

const router = Router();

router.get('/', paramsFiltersController.getAll);

router.post('/add', paramsFiltersController.create);

router.put('/update/:id', paramsFiltersController.update);

router.delete('/delete/:id', paramsFiltersController.distroy);

export default router;
