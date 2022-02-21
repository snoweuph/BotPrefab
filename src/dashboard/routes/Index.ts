import { Router } from 'express';
const router = Router();

router.get('/', (req, res) => {
    res.render('sites/index');
});

import apiRouter from './api/Index';
router.use('/api', apiRouter);

router.get('*', (req, res) => {
    res.render('sites/errors/404');
});

export default router;