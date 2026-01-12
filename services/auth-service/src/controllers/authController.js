const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const User = require('../models/user');

exports.register = async (req, res) => {
    const { email, password } = req.body;
    if (!email || !password) {
        return res.status(400).json({ message: 'Email and password are required' });
    }

    try {
        const existing = await User.findOne({ email });
        if (existing) {
            return res.status(400).json({ message: 'User already exists' });
        }

        const hashed = await bcrypt.hash(password, 10);
        await User.create({ email, password: hashed });
        return res.status(201).json({ message: 'User registered' });
    } catch (error) {
        console.error('register error:', error.message || error);
        return res.status(500).json({ message: 'Registration failed' });
    }
};

exports.login = async(req, res)=>{
    const {email} = req.body;

    const token = jwt.sign(
        {email},
        process.env.JWT_SECRET,
        {expiresIn: '1h'}
    );
    res.json({ token });
};

exports.verifyToken = (req, res)=>{
    const token = req.headers.authorization?.split(' ')[1];
    if(!token) return res.status(401).json({message: 'No token'});

    try{
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        res.json({valid: true, user: decoded})
    }catch{
        res.status(401).json({valid: false});
    }
};