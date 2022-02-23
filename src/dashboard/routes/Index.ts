import { Router } from 'express';
const router = Router();

router.get('/', (req, res) => {
    res.render('sites/index', {
        relPath: './',
        user: req.user ? req.user : null
    });
});
router.get('/status', (req, res) => {
    res.render('sites/status', {
        relPath: '../'
    });
});

import apiRouter from './api/Index';
router.use('/api', apiRouter);

import guildsRouter from './guilds/Index';
router.use('/guilds', guildsRouter);

router.get('*', (req, res) => {
    const routes = req.url.split('/');
    routes.shift();
    let relPath = '';
    routes.forEach(route => {
        relPath += '../'
    });
    res.render('sites/errors/404', {
        relPath: relPath
    });
});

export default router;