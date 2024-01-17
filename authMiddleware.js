const jwt = require('jsonwebtoken');
require('dotenv').config();

const secretKey = process.env.JWT_SECRET;

function verifyToken(req, res, next) {
    const token = req.headers.authorization;

    // Skip token verification for specific routes
    const skipTokenVerification = ['/api/login', '/api/register'];

    if (!token && !skipTokenVerification.includes(req.path)) {
        return res.status(401).json({ message: 'Unauthorized - Missing token' });
    }

    if (!token) {
        // If the route is in the skipTokenVerification array, proceed without a token
        return next();
    }

    jwt.verify(token, secretKey, (err, decoded) => {
        if (err) {
            return res.status(403).json({ message: 'Forbidden - Invalid token' });
        }

        req.user = decoded;
        next();
    });
}

module.exports = verifyToken;
