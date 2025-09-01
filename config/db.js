const mongoose = require('mongoose');

const connectDB = async () =>{
try {
    const connected = await mongoose.connect(process.env.MONGO_URI);
    console.log('Database is connected successfully ');
} catch (error) {
    console.log('Database couldnt be connected with the error message : ' , error.message );
}

}

module.exports = connectDB;