import express from 'express';
import passport
    from 'passport';
const router = express.Router();

router.get('/', passport.authenticate('discord'), (req, res) => {
    res.send(200);
});
router.get('/redirect', passport.authenticate('discord'), (req, res) => {
    res.send({ msg: 'Succes' });
});

export default router;