const express = require('express');

const controller = require('../controllers/dashbaordControllers');
const { protect } = require('../middlewares/globalMiddleware');
const router = express.Router();

router.get('/login', controller.login);

router.use(protect);
router.get('/', controller.media);
router.get('/users', controller.users);
router.get('/movie', controller.movie);
router.get('/game', controller.game);
router.get('/game/about', controller.about);
router.get('/series', controller.series);
router.get('/season', controller.season);
router.get('/episode', controller.episode);
router.get('/collection', controller.collection);
router.get('/account', controller.account);

router.get('/new', controller.new);

module.exports = router;
