const mongoose = require('mongoose')

const ordersSchema = new mongoose.Schema({

    user: {
        
        type : String,
        required : true,
        unique : true

    },

    amount :{

        type: Number,
        required :true

    },
    date : {

        type: Date,
        required : true

    },
    paymentinfo:{

        type: String,
        required :true

    },

    address:{
        type: String,
        required :true
    },

    products: [
    {
        product: { type: mongoose.Schema.Types.ObjectId, ref: "Product" },
        quantity: { type: Number, required: true }
    }
    ],

    status: {

    type: String,
    enum: ["pending", "processing", "shipped", "delivered", "cancelled"],
    default: "pending"

    },

    paymentStatus: {

    type: String,
    enum: ["pending", "paid", "failed", "refunded"],
    default: "pending"

    },

    trackingNumber: {

    type: String

    },

    createdAt: {

    type: Date,
    default: Date.now

    },
    updatedAt: {

    type: Date,
    default: Date.now

    }


})

const Orders = mongoose.model('orders',ordersSchema);
model.exports = Orders;