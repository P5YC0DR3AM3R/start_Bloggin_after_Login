const express = require('express');
const router = express.Router();
const authGuard = require('../utils/authGuard');

// Example protected route
router.get('/dashboard', authGuard, (req, res) => {
    res.render('dashboard');
});

module.exports = router;
