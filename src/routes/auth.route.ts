import { Router } from 'express';

import mobileAuthController from '../controllers/mobile.auth.controller';
import authController from '../controllers/admin/auth.controller';

const router = Router();

router.post('/login', authController.login);

router.post('/mobile/login', mobileAuthController.login);
router.post('/mobile/verify-code', mobileAuthController.verifySmsCode);

router.post('/refresh-token', authController.refreshToken);

router.get('/logout', authController.logout);

export default router;
