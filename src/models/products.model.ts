const mongoose = require('mongoose')

const productSchema = new mongoose.Schema({

    title: {
        
        type : String,
        required : true

    },

    description :{

        type: String,
        required :true

    },
    price :{

        type: Number,
        required :true,
        min: 0
    },
    photo : {

        data: Buffer,
        contentType: String

    },
    reviews:{

        type: String,
        required :true

    },
    stock: {
        type: Number,
        required: true,
        min: 0
},

    category: {
        type: String,
        required: true
    },

    variants: [
    {
        size: String,
        color: String,
        stock: Number
    }
    ],

    discount: {

        type: Number,
        default: 0

    },

    rating: {

        type: Number,
        default: 0
        
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

const Product = mongoose.model('product',productSchema);
module.exports = Product;
