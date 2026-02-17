const express = require('express');
const { generateCertificate, downloadCertificate } = require('../controllers/certificateController');
const { authenticateToken } = require('../middleware/authMiddleware');

const router = express.Router();

router.use(authenticateToken);

router.post('/generate', generateCertificate);
router.get('/download', downloadCertificate);

module.exports = router;
