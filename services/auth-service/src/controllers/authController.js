const jwt = require('jsonwebtoken');

exports.login = async(req, res)=>{
    const {email} = req.body;

    const token = jwt.sign(
        {email},
        process.env.JWT_SECRET,
        {expiresIn: '2min'}
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