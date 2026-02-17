const express = require('express');
const { updateProgress, completeChapter, getProgress } = require('../controllers/progressController');
const { authenticateToken } = require('../middleware/authMiddleware');

const router = express.Router();

router.use(authenticateToken); // Protect all routes

router.get('/', getProgress);
router.post('/update', updateProgress);
router.post('/complete', completeChapter);

module.exports = router;
