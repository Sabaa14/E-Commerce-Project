const express = require('express');
const jwt = require('jsonwebtoken');
const User = require('../models/user.model');



const LoginAuth = async (req, res, next) => {
    
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
     
        if(!user){
            return res.status(401).json({success: false, message: 'Not authorized'});
        }
        // sending the full user 
        req.user = user ;
        next();

    } catch (error) {
        return res.status(401).json({ success : false , message :'User has nnot yet logged in with the error message : '});
    }
}

module.exports = {LoginAuth}
