const mongoose = require('mongoose')

const productSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },

    description: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true,
        min: 0
    },
    photo: {

        data: Buffer,
        contentType: String

    },
    reviews: [
  {
    name: {
      type: String,
      required: true
    },
    email: {
      type: String,
      required: false // Optional for logged-in users
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: false // Present only for registered users
    },
    rating: {
      type: Number,
      required: true,
      min: 1,
      max: 5
    },
    comment: {
      type: String,
      required: true
    },
    createdAt: {
      type: Date,
      default: Date.now
    }
  }
],
    stock: {
        type: Number,
        required: true,
        min: 0
    },

    category: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Category',
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

const Product = mongoose.model('Product', productSchema);
module.exports = Product;
