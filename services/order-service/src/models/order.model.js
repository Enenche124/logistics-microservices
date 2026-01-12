const pool = require('../config/db');

exports.createOrder = async (userEmail, pickup, delivery) => {
  const result = await pool.query(
    'INSERT INTO orders (user_email, pickup, delivery) VALUES ($1, $2, $3) RETURNING *',
    [userEmail, pickup, delivery]
  );

  return result.rows[0];
};
