import { Router } from 'express';
const router = Router();

import discordRouter from './Discord';
router.use('/discord', discordRouter);

export default router;