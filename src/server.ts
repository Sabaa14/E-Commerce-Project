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

app.use(cors({
    origin: function(origin, callback) {
        if(whitelist.includes(origin)) {
            callback(null, true)
        } else {
            callback("Error")
        }
    }
}));

app.use((error : any, req: Request, res: Response, next) => {
    console.log("This is the error handling middleware: ", error);
    res.status(500).send("Something went wrong");
});

app.get('/', (req, res) => {
    res.send("The server is running on http://localhost:3000")
})

app.listen(process.env.PORT , () => {
    connectDB();
    console.log("The server is running on Port : " , process.env.PORT);
})

process.on('unhandledRejection', (error: any, req: Request, res: Response, next) => {
    console.error("There is an error:", error.message);
    res.status(500).json({success: false, message: `There is an error ${error.message}`})
})