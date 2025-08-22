const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
name :{

    type : String,
    required:true,
    unique : true,

},

email: {
    
    type: String,
    required : true ,
    unique: true
},

address :{

    type : String,
    required : required
    
},

phone:{

    type: Number,
    required : true ,
    unique : true

},
password :{

    type :String,
    required : true

},

age:{

    type : Number,
    required : true

}
})

const User = mongoose.model('User',userSchema);
model.exports = User;