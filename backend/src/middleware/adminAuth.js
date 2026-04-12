const jwt = require('jsonwebtoken');
const User = require('../models/User');

const adminAuth = async (req, res, next) => {
    try {
        const token = req.header('Authorization')?.replace('Bearer ', '');
        
        if (!token) {
            throw new Error('Authentication required');
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET || 'healthbuddy_fallback_secret');
        const user = await User.findOne({ _id: decoded.id });

        if (!user) {
            throw new Error('User not found');
        }

        if (user.role !== 'admin') {
            throw new Error('Access denied. Administrator privileges required.');
        }

        req.token = token;
        req.user = user;
        next();
    } catch (error) {
        res.status(401).send({ error: 'Not authorized to access this resource.' });
    }
};

module.exports = adminAuth;
