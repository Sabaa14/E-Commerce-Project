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
    required : true

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

},

role: {
    
  type: String,
  enum: ["user", "admin"],
  default: "user"

},

addresses: [
  {
    street: String,
    city: String,
    zip: String,
    country: String
  }
],

wishlist: [

  { type: mongoose.Schema.Types.ObjectId, ref: "Product" }

],

cart: [

  { product: { type: mongoose.Schema.Types.ObjectId, ref: "Product" }, quantity: { type: Number, default: 1 } }

],

createdAt: {

  type: Date,
  default: Date.now

},

updatedAt: {

  type: Date,
  default: Date.now

}

})

const User = mongoose.model('User',userSchema);
module.exports = User;
