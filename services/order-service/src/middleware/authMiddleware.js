const axios = require('axios');

const verifyAuth  = async(req, res, next)=>{
    try{
        const authHeader = req.headers.authorization;
        if(!authHeader){
            return res.status(401).json({message: 'No token provided'});
        }
        const response = await axios.get('http://localhost:4001/auth/verify', {
            headers: { Authorization: authHeader },
        });

        if(response.data.valid){
            req.user = response.data.user;
            next();
        }else{
            res.status(401).json({message: 'Invalid token'})
        }
    } catch (error) {
        console.error('verifyAuth error:', error.message || error);
        res.status(401).json({ message: 'Unauthorized' });
    }
}

module.exports = verifyAuth;