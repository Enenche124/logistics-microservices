const pool = require('../config/db');


exports.createOrder = async (req, res) => {
    const { pickup, delivery } = req.body;
    const userEmail = req.user.email;

    if (!pickup || !delivery) {
        return res.status(400).json({ message: 'Pickup and delivery locations are required' });
    }
    try {
        const result = await pool.query(
            'INSERT INTO orders (user_email, pickup, delivery) VALUES ($1, $2, $3) RETURNING *',
            [userEmail, pickup, delivery]
        );
        return res.status(201).json({
            message: 'Order created successfully',
            order: result.rows[0],
        });
    } catch (error) {
        console.error('createOrder error:', error);
        return res.status(500).json({ message: 'Failed to create order' });
    }
};

// module.exports = { createOrder };