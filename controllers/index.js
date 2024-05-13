const express = require('express');
const router = express.Router();

const postController = require('./postController');
const userController = require('./userController');
const homeRoutes = require('./homeRoutes');

// Use homeRoutes for the homepage
router.use('/', homeRoutes);

// Use postController for posts-related routes
router.use('/api/posts', postController);

// Use userController for user-related routes
router.use('/api/users', userController);

module.exports = router;
