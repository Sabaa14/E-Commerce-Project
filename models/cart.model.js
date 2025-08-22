const mongoose = require('mongoose')

const cartSchema = new mongoose.Schema({

   user: {
        
        type : String,
        required : true,
        unique : true

    },

    product :{

        type: String,
        required :true,
        unique :true

    },

})


const Cart = mongoose.model('cart',cartSchema);
model.exports = Cart;