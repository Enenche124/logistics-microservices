const express = require('express');
const router = express.Router();
const { login, verifyToken, register } = require('../controllers/authController');

router.post('/login', login);
router.post('/register', register);
router.get('/verify', verifyToken);

module.exports = router;