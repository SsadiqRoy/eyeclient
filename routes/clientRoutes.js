const express = require('express');

const controller = require('../controllers/clientControllers');
const router = express.Router();

router.get('/', controller.home);
router.get('/explore/:page', controller.explore);
router.get('/media', controller.search);
router.get('/detail/:id', controller.details);
router.get('/download/:id', controller.download);

module.exports = router;
