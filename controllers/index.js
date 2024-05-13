const postController = require('./postController');
const userController = require('./userController');
const homeRoutes = require('./homeRoutes');

const express = require('express');
const router = express.Router();

router.use('/', postController);
router.use('/', userController);
router.use('/', homeRoutes);

module.exports = router;
