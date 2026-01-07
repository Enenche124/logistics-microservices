const express = require('express');
const axios = require('axios');
const router = express.Router();

router.post('/', async (req, res) => {
    try {
        const response = await axios.post('http://localhost:4002/orders', req.body
            , {
             headers:{
                Authorization: req.headers.authorization
            } 
        } );
        res.json(response.data);
      
    
}catch (error) {
        res.status(500).json({ message: 'Order service error' });
    }
});

module.exports = router;