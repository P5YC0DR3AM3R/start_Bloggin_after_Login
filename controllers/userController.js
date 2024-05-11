const express = require('express');
const router = express.Router();

// Define routes for user-related operations
router.get('/profile', (req, res) => {
  res.send('User Profile');
});

module.exports = router;
