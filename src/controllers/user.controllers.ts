const User = require("../models/user.model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
var validator = require("email-validator");
const PasswordValidator = require('password-validator');


const login = async (req,res) => {
    const {email , password } = req.body;
    const existingUser = await User.findOne({email});

        if(!existingUser) {
            return res.status(404).json({success: false, message: "User is not found"});
        }
    
    try {

        const isPassowordValid = await bcrypt.compare(password ,existingUser.password);

        if(!isPassowordValid){
        return res.status(404).json({success: false, message: "password is not correct!"});
        }
        
        const token = jwt.sign({id: existingUser._id , email : existingUser.email}, process.env.JWT_SECRET);

        res.cookie("token" ,token);

        res.status(200).json({success: true, message: "user has Logged in"});

    } catch (error) {
        res.status(500).json("Error :" , error.message);
    }

}


const register = async ( req,res ) => {
const { username , email , password ,age } = req.body;
const exsitingUser = await User.findOne({email});
const emailtester = validator.validate(email);
const Passwordvalidation = new PasswordValidator()
  .is().min(8)
  .has().uppercase()
  .has().lowercase()
  .has().digits();

  const passwordtester = Passwordvalidation.validate(password);


if (exsitingUser){
    return res.status(400).json({success: false, message :"The user is already created!", user : exsitingUser});
}

if(age<18){
    return res.status(400).json({success: false, message :"You must be at least 18 years old to register!"});
}

if(!passwordtester){
  return res.status(400).json({ success: false, message: "Password must be at least 8 characters, include uppercase, lowercase, and a number." });
}

if(!emailtester){
    return res.status(400).json({success :false , message :"Please write a valid email!"})
}

try {
         const hashedPassword = await bcrypt.hash(password,10);



         const newUser = new User({
            username,
            email,
            password : hashedPassword,
            age
         } )

         await newUser.save();

         res.status(201).json({ success : true , message : " a NewUser has just been created " , user : newUser});

        } catch (error) {
        res.status(500).json("Error :" , error.message);
        }
}

module.exports = {
    login,
    register
}