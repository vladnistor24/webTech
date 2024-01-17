// routes/users.js

const express = require('express');
const router = express.Router();

// Define user routes
router.get('/', (req, res) => {
  res.send('User routes are working!');
});

module.exports = router;
