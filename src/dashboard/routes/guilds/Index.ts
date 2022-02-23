import { Router } from 'express';
import { isAuthenticated } from '../../utils/Middlewares';
const router = Router();

router.get('/', isAuthenticated, (req, res) => {
    res.send('Hello World!');
});

export default router;