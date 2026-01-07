const express = require('express');
const app = express();

const authRoutes = require('./routes/authRoutes');
const orderRoutes = require('./routes/orderRoutes');

app.use(express.json());
app.use('/auth', authRoutes);
app.use('/v1', orderRoutes);

app.get('/health', (req, res) =>{
    res.json({status: 'API Gateway is healthy'});
});

module.exports = app;