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

    }

})

const Product = mongoose.model('product',productSchema);
model.exports = productSchema;