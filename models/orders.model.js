const mongoose = require('mongoose')

const ordersSchema = new mongoose.Schema({

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
    }

})

const Orders = mongoose.model('orders',ordersSchema);
model.exports = productSchema;