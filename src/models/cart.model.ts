const mongoose = require('mongoose')


const cartSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        unique: true
    },

    items: [
        {
            product: { type: mongoose.Schema.Types.ObjectId, ref: "Product" },
            quantity: { type: Number, default: 1 }
        }
    ],

    updatedAt: {
        type: Date,
        default: Date.now
    }
})


const Cart = mongoose.model('cart', cartSchema);
module.exports = Cart;

