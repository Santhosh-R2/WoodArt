const express = require('express');
const router = express.Router();
const { getGlobalStats } = require('../controller/adminController');
const { protect } = require('../middleware/authMiddleware');

router.get('/stats', protect, getGlobalStats); // Admin Protected

module.exports = router;
