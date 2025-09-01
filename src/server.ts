const express = require('express');
const app = express();
const connectDB = require('./config/db');
const cors = require('cors');
require('dotenv').config();




app.use(express.json());


app.use((error : unknown, req, res, next) => {
    console.log("This is the error handling middleware: ", error);
    res.status(500).send("Something went wrong");
})

app.listen(process.env.PORT , () => {
    connectDB();
    console.log("The server is running on Port : " , process.env.PORT);
})