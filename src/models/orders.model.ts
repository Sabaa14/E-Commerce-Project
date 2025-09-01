const mongoose = require('mongoose')

const ordersSchema = new mongoose.Schema({
    
    user: {
        
        type : mongoose.Schema.Types.ObjectId, ref: "User",
        required : true,
        unique : true
        
    },
    
    orderItems: [
    {
        name: { type: String, required: true },
        image: { type: String, required: true },
        price: { type: Number, required: true },
        quantity: { type: Number, required: true },
        product: { type: mongoose.Schema.Types.ObjectId, ref: "Product" }

    }
    ],
    
    totalPrice :{

        type: Number,
        required :true

    },

   paymentMethod: {

        type: String,
        enum: ['PayPal', 'CreditCard', 'Stripe', 'CashOnDelivery'],
        required: true

    },


    shippingAddress:{
        type: String,
        required :true
    },


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
module.exports = Orders;
