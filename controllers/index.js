const express = require('express');
const router = express.Router();

const homeRoutes = require('./homeRoutes');

const apiRoutes = require('./api/');

// Use homeRoutes for the homepage
router.use('/', homeRoutes);

// Use postController for posts-related routes
router.use('/api', apiRoutes);

module.exports = router;
