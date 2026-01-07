const express = require('express');
const router = express.Router();
const verifyAuth = require('../middleware/authMiddleware');
const { createOrder } = require('../controllers/orderController');

router.post('/', verifyAuth, createOrder);

module.exports = router;