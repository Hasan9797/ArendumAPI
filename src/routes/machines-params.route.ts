import { Router } from 'express';

import machinParamsController from '../controllers/admin/machine.params.controller';
import { authentication, authorization } from '../middleware/auth.middleware';
import { ROLES } from '../constants/user-role.constant';

const router = Router();

router.get('/', authentication, machinParamsController.getAll);

router.post('/add', authentication, machinParamsController.create);

router.put('/update/:id', machinParamsController.update);

router.delete('/delete/:id', machinParamsController.distroy);

export default router;
