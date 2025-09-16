const mongoose = require('mongoose')

const categorySchema = new mongoose.Schema({ 

    name :{
        type : String,
        required : true,
        unique : true,
        // to clean up whitespaces
        trim : true
    },
    // slug are for the URLs to be more readable for the user instead of the ids 
    // will be written with lowercase / space-free and also speacial-character-free
    slug : {
        type : String,
        required: true,
        // to clean up whitespaces
        trim : true
    },

    description : {
        type : String,
        required : true
    }
    
},

    { 
        timestamps: true 
    }
)

const Category = mongoose.model('Category', categorySchema);
module.exports = Category;