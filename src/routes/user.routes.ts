const express = require('express');
const { register, login, googleLogin, googleCallback } = require('../controllers/user.controllers')
const router = express.Router();

router.post("/register", register);
router.post("/login", login);
// Start Google login
router.get("/auth/google", googleLogin);
// callback
router.get("/auth/google/callback", googleCallback);


module.exports = router;