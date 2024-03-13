const GoogleStrategy = require("passport-google-oauth20").Strategy;
const passport = require("passport");
// Import dotenv package
const dotenv = require("dotenv");

// Specify the path to the .env file
const path = require("path");
const envPath = path.join(__dirname, "..", "..", ".env"); // Construct the path to .env file

// Load environment variables from the .env file
dotenv.config({ path: envPath });
passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.CLIENT_ID,
      clientSecret: process.env.CLIENT_SECRET,
      callbackURL: "/api/auth/success",
      passReqToCallback: true,
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
const ErrorResponse = require("../utils/errorResponse");
const jwt = require("jsonwebtoken");
const User = require("../models/userModels");

// check is user is authenticated
exports.isAuthenticated = async (req, res, next) => {
  const { token } = req.cookies;
  // Make sure token exists
  if (!token) {
    return next(new ErrorResponse("Not authorized to access this route", 401));
  }

  try {
    // Verify token
    const jkey = "jwtPrivateKey";
    const decoded = jwt.verify(token, jkey);
    req.user = await User.findById(decoded.id);
    next();
  } catch (error) {
    return next(new ErrorResponse("Not authorized to access this route", 401));
  }
};

//middleware for admin
exports.isAdmin = (req, res, next) => {
  if (req.user.role === 0) {
    return next(new ErrorResponse("Access denied, you must an admin", 401));
  }
  next();
};
