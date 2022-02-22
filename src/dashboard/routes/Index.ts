import { Router } from 'express';
const router = Router();

router.get('/', (req, res) => {
    res.render('sites/index');
});

import apiRouter from './api/Index';
router.use('/api', apiRouter);

router.get('*', (req, res) => {
    const routes = req.url.split('/');
    routes.shift();
    let relPath = '';
    routes.forEach(route => {
        relPath += '../'
    });
    relPath += 'static/';
    res.render('sites/errors/404', {
        page: req.url,
        relPath: relPath
    });
});

export default router;