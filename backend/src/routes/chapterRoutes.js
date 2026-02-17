const express = require('express');
const {
    getAllChapters,
    getChapterById,
    createChapter,
    updateChapter,
    deleteChapter
} = require('../controllers/chapterController');
const { authenticateToken, requireAdmin } = require('../middleware/authMiddleware');

const router = express.Router();

// Public/User routes (Authenticated users)
router.get('/', authenticateToken, getAllChapters);
router.get('/:id', authenticateToken, getChapterById);

// Admin routes
router.post('/', requireAdmin, createChapter);
router.put('/:id', requireAdmin, updateChapter);
router.delete('/:id', requireAdmin, deleteChapter);

module.exports = router;
