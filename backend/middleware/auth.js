const GoogleStrategy = require("passport-google-oauth20").Strategy;
const passport = require("passport");
// Import dotenv package
const dotenv = require('dotenv');

// Specify the path to the .env file
const path = require('path');
const envPath = path.join(__dirname, '..', '..', '.env'); // Construct the path to .env file

// Load environment variables from the .env file
dotenv.config({ path: envPath });
passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.CLIENT_ID,
      clientSecret: process.env.CLIENT_SECRET,
      callbackURL: "/api/auth/success",
      passReqToCallback: true
    },
    function (accessToken, refreshToken, profile, callback) {
      return done(err, profile);
    }
  )
);

passport.serializeUser((user, done) => {
  done(null, user);
});
passport.deserializeUser((user, done) => {
  done(null, user);
});
