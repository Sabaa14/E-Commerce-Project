const jwt = require('jsonwebtoken');
const User = require('../models/user.model');
import { Request, Response, NextFunction } from 'express';
import { UserInterface } from '../types/User';

interface AuthenticatedRequest extends Request {
    user: UserInterface; 
}

const loginAuth = async (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
    try {
        // making sure the headers has the authorization word
        const authHeader = req.headers['authorization'];
        // testing if we have the header or also we have have it with the word Bearer 
        if (!authHeader || !authHeader.startsWith('Bearer ')) {
            return res.status(401).json({ success: false, message: 'No token provided!' });
        }

        // extract the token from the headers
        const token = authHeader.split(' ')[1];

        // verify the token 
        const decoded = jwt.verify(token, process.env.JWT_SECRET);


        // Find the user and attach it back to the request and then Exclude password
        const user = await User.findById(decoded.id).select('-password');

        if (!user) {
            return res.status(401).json({ success: false, message: 'Not authorized' });
        }
        // sending the full user 
        req.user = user;
        next();

    } catch (error) {
        return res.status(401).json({ success: false, message: 'User has not yet logged in with the error message : ' });
    }
}

const admin = async (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
    if (req.user && req.user.role === 'admin') {
        next();
    }
    else {
        res.status(403).json({ message: 'Access denied. Admin privileges required.' })
    }
}

module.exports = {
    loginAuth,
    admin
}