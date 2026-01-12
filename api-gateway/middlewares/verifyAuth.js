const axios = require('axios');

const verifyAuth  = async(req, res, next)=>{
    try{
        const authHeader = req.headers.authorization;
        console.debug('verifyAuth - incoming Authorization header:', authHeader);
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
        // Distinguish auth error from other errors
        if (error.response && error.response.status === 401) {
            console.warn('verifyAuth - auth service rejected token:', error.response.data || error.message);
            return res.status(401).json({ message: 'Invalid or expired token' });
        }

        console.error('verifyAuth error:', error.message || error);
        return res.status(500).json({ message: 'Authentication service error' });
    }
}

module.exports = verifyAuth;