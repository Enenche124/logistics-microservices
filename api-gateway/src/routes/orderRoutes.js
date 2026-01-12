const express = require('express');
const axios = require('axios');
const verifyAuth = require('../../middlewares/verifyAuth');


const router = express.Router();

router.post('/orders', verifyAuth, async (req, res) => {
    try {
        const response = await axios.post('http://localhost:4002/v1/orders', req.body
            , {
             headers:{
                "x-user-email": req.user.email,
                "x-user-id": req.user.id
                
            } 
        } );
        res.json(response.data);
      
    
}catch (error) {
        res.status(500).json({ message: 'Order service error' });
    }
});

module.exports = router;