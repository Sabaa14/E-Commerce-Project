const User = require("../models/user.model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
var validator = require("email-validator");
const PasswordValidator = require('password-validator');
const passport = require('../config/googleAuth.ts')

const login = async (req, res) => {
    const { email, password } = req.body;
    const existingUser = await User.findOne({ email });

    if (!existingUser) {
        return res.status(404).json({ success: false, message: "User is not found" });
    }

    try {

        const isPassowordValid = await bcrypt.compare(password, existingUser.password);

        if (!isPassowordValid) {
            return res.status(404).json({ success: false, message: "password is not correct!" });
        }

        const token = jwt.sign({ id: existingUser._id, email: existingUser.email }, process.env.JWT_SECRET);

        res.setHeader('Authorization', `Bearer ${token}`);
        res.status(200).json({ success: true, message: "user has Logged in", user: existingUser });

    } catch (error) {
        res.status(500).json("Error :", error.message);
    }
}


const register = async (req, res) => {
    const { username, email, password, confirmPassword } = req.body;
    const exsitingUser = await User.findOne({ email });
    const emailtester = validator.validate(email);
    const Passwordvalidation = new PasswordValidator()
        .is().min(8)
        .has().uppercase()
        .has().lowercase()
        .has().digits();

    const passwordtester = Passwordvalidation.validate(password);


    if (exsitingUser) {
        return res.status(400).json({ success: false, message: "The user is already created!", user: exsitingUser });
    }

    // if (age < 18) {
    //     return res.status(400).json({ success: false, message: "You must be at least 18 years old to register!" });
    // }

    if (!passwordtester) {
        return res.status(400).json({ success: false, message: "Password must be at least 8 characters, include uppercase, lowercase, and a number." });
    }

    if (!emailtester) {
        return res.status(400).json({ success: false, message: "Please write a valid email!" })
    }

    if (password !== confirmPassword) {
        return res.status(400).json({ success: false, message: "Password and Confirm Password do not match!" });
    }

    try {
        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = new User({
            username,
            email,
            password: hashedPassword,
        })

        await newUser.save();

        res.status(201).json({ success: true, message: " a NewUser has just been created ", user: newUser });

    } catch (error) {
        res.status(500).json("Error :", error.message);
    }
}

const googleLogin = async (req, res) => { 
    passport.authenticate("google", {
    scope: ["profile", "email"],
    session: false,
  })
}

const googleCallback = async (request, response) => {
    passport.authenticate("google", { failureRedirect: "/", session: false }),
  async (req: any, res: any) => {
    try {
      const googleId = req.user.id;
      const email = req.user.emails[0].value;

      let user = await User.findOne({ googleId });
      if (!user) {
        user = await User.create({
          name: req.user.displayName,
          email,
          googleId,
        });
      }

      const token = jwt.sign(
        { id: user._id, email: user.email, name: user.name },
        process.env.JWT_SECRET!,
        { expiresIn: "1h" }
      );

      res.redirect(`${process.env.FRONTEND_URL}?token=${token}`);
    } catch (error) {
      console.error("OAuth error:", error);
      res.redirect("/login?error=oauth_failed");
    }
  }
}

module.exports = {
    login,
    register,
    googleLogin,
    googleCallback
}