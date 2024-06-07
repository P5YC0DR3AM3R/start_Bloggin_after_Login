const express = require('express');
const router = express.Router();

const postController = require('./postController');
const userController = require('./userController');

// Use postController for posts-related routes
router.use('/posts', postController);

// Use userController for user-related routes
router.use('/users', userController);

module.exports = router;
