const express = require('express');
const { getAdminStats } = require('../controllers/dashboardController');
const { requireAdmin } = require('../middleware/authMiddleware');

const router = express.Router();

router.get('/stats', requireAdmin, getAdminStats);

module.exports = router;
