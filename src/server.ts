import { Request, Response } from "express";

const express = require('express');
const app = express();
const connectDB = require('./config/db');
const userRoutes = require('./routes/user.routes');
const cartRoutes = require('./routes/cart.routes');
// const ordersRoutes = require('./routes/orders.routes');
// const productsRoutes = require('./routes/products.routes');
// const reviewsRoutes = require('./routes/reviews.routes');
// const wishlistRoutes = require('./routes/wishlist.routes'); 
// const categoriesRoutes = require('./routes/categories.routes'); 
const cors = require('cors');
require('dotenv').config();


app.use('/api/users', userRoutes);
app.use('/api/cart', cartRoutes);
// app.use('/api/orders', ordersRoutes);
// app.use('/api/products', productsRoutes);
// app.use('/api/reviews', reviewsRoutes);
// app.use('/api/wishlist', wishlistRoutes);
// app.use('/api/categories', categoriesRoutes);

app.use(express.json());
// backendorigin = protocol + domain + port
// frontendorigin = protocol + domain + port
// whitlist

let whitelist = ['http://localhost:3300', 'https://www.abdelrahman.com', 'https://localhost:8000'];
let corsOptions = {
    origin: function (origin, callback) {
        if (whitelist.includes(origin)) {
            callback(null, true)
        } else {
            callback("Error")
        }
    }
};

app.use(cors());

// -----------------------------------------------------------------------------
// OAuth 2.0
// google - facebook - github
// passport.js
// google-auth-library

const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const jwt = require("jsonwebtoken");

// app.use(passport.initialize());

// Configure Passport with Google
passport.use(new GoogleStrategy(
    {
        clientID: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        callbackURL: "http://localhost:3000/auth/google/callback",
    },
    (accessToken, refreshToken, profile, done) => {
        return done(null, profile);
    }
));

// Start Google login
app.get("/auth/google",
    passport.authenticate("google", { 
        scope: ["profile", "email"], 
        session: false 
    })
);

// Callback
app.get("/auth/google/callback",
    passport.authenticate("google", { failureRedirect: "/", session: false }),
    (req, res) => {
        console.log("Request From Google: ", req.user)
        const token = jwt.sign(
            {
                id: req.user.id,
                email: req.user.emails[0].value,
                name: req.user.displayName,
            },
            process.env.JWT_SECRET,
            { expiresIn: "1h" }
        );

        // Redirect with token in query params
        res.redirect(`http://localhost:5173?token=${token}`);
    }
);

// Protected route
app.get("/protected", (req, res) => {
    const authHeader = req.headers.authorization;
    if (!authHeader) return res.status(401).json({ message: "No token provided" });

    const token = authHeader.split(" ")[1];
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        res.json({ message: "Access granted", user: decoded });
    } catch {
        res.status(401).json({ message: "Invalid or expired token" });
    }
});

// ----------------------------------------------------------------


app.use((error: any, req: Request, res: Response, next) => {
    console.log("This is the error handling middleware: ", error);
    res.status(500).send("Something went wrong");
});

app.get('/', (req, res) => {
    res.send("The server is running on http://localhost:3000")
})

app.listen(process.env.PORT, () => {
    connectDB();
    console.log("The server is running on Port : ", process.env.PORT);
})

process.on('unhandledRejection', (error: any, req: Request, res: Response, next) => {
    console.error("There is an error:", error.message);
    res.status(500).json({ success: false, message: `There is an error ${error.message}` })
})