import passport from "passport";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";
require("dotenv").config();


// Configure Google OAuth Strategy
passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
      callbackURL: process.env.GOOGLE_CALLBACK_URL || "http://localhost:3000/auth/google/callback",
    },
    (accessToken, refreshToken, profile, done) => {
      // At this point you could:- Save user to DB if not exists - Update last login
      return done(null, profile);
    }
  )
);

// passport.serializeUser((user, done) => {
//   done(null, user);
// });

// passport.deserializeUser((user, done) => {
//   done(null, user as any);

export default passport;
