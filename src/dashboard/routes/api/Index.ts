import { Router } from 'express';
const router = Router();

import authRouter from './auth/Index';
router.use('/auth', authRouter);

export default router;