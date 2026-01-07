const express = require('express');
const axios = require('axios');
const router = express.Router();

router.post('/login', async (req, res) => {
    try {
        const response = await axios.post('http://localhost:4001/auth/login', req.body);
        res.json(response.data);
    } catch (error) {
        res.status(500).json({ message: 'Auth service error' });
    }
});

module.exports = router;