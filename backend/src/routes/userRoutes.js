const express = require('express');
const { getAllUsers, getUserProfile, createUser, changePassword, resetPasswordAdmin } = require('../controllers/userController');
const { authenticateToken, requireAdmin } = require('../middleware/authMiddleware');

const router = express.Router();

// User routes
router.get('/me', authenticateToken, getUserProfile);
router.post('/change-password', authenticateToken, changePassword);

// Admin routes
router.get('/', requireAdmin, getAllUsers);
router.post('/', requireAdmin, createUser);
router.post('/admin-reset-password/:id', requireAdmin, resetPasswordAdmin);

module.exports = router;
