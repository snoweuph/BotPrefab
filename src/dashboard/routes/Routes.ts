import express from 'express';

const router = express.Router();

router.get('/', (req, res) => {
    res.render('sites/index');
});
router.get('*', (req, res) => {
    //render error page (ejs)
    res.render('sites/errors/404');
});

export default router;