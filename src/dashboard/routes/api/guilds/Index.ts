import { Router } from 'express';
import { getGuildsController } from '../../../controllers/guilds/Index';
import { isAuthenticated } from '../../../utils/Middlewares';
const router = Router();

router.get('/', isAuthenticated, getGuildsController);

export default router;