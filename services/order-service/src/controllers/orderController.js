const pool = require('../config/db');
const OrderModel = require('../models/order.model');


exports.createOrder = async (req, res) => {
    const { pickup, delivery } = req.body;
    const userEmail = req.headers['x-user-email'];

    if (!userEmail) {
        return res.status(401).json({ message: 'Unauthenticated request' });
    }

    if (!pickup || !delivery) {
        return res.status(400).json({ message: 'Pickup and delivery locations are required' });
    }
    try {
        const result = await OrderModel.createOrder(userEmail, pickup, delivery);
        return res.status(201).json({
            message: 'Order created successfully',
            result,                                                                                                             
        });
    } catch (error) {
        console.error('createOrder error:', error);
        return res.status(500).json({ message: 'Failed to create order' });
    }
};

// module.exports = { createOrder };