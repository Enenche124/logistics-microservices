const express = require('express');
const app = express();
const orderRoutes = require('./routes/orderRoutes');

app.use(express.json());
app.use('/v1', orderRoutes)

app.get('/health', (req, res) =>{
    res.json({status: 'Order service is healthy'});
});

module.exports = app;