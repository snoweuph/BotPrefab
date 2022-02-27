import { Router } from 'express';
const router = Router();

import authRouter from './auth/Index';
router.use('/auth', authRouter);
import guildsRouter from './guilds/Index';
router.use('/guilds', guildsRouter);

export default router;