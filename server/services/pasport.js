const passport = require("passport");
const User = require("../models/culinaAdmin");
require("dotenv").config();
const JwtStrategy = require("passport-jwt").Strategy; //extract this properties
const ExtractJwt = require("passport-jwt").ExtractJwt; //extract this properties
const LocalStrategy = require("passport-local");

// Create local strategy
const localOptions = { usernameField: "email" };
const localLogin = new LocalStrategy(
  localOptions,
  function (email, password, done) {
    // Verify this email and password, call done with the user
    // if it is the correct email and password
    // otherwise, call done with false
    User.findOne({ email: email }, function (err, user) {
      if (err) {
        return done(err);
      }
      if (!user) {
        return done(null, false);
      }

      // compare passwords - is `password` equal to user.password?
      user.comparePassword(password, function (err, isMatch) {
        if (err) {
          return done(err);
        }
        if (!isMatch) {
          return done(null, false);
        }

        return done(null, user);
      });
    });
  }
);

// Setup options for JWT Strategy
const jwtOptions = {
  jwtFromRequest: ExtractJwt.fromHeader("authorization"),
  secretOrKey: process.env.JET_SECRET,
};

// Create JWT strategy
const jwtLogin = new JwtStrategy(jwtOptions, function (payload, done) {
  // See if the user ID in the payload exists in our database
  // If it does, call 'done' with that other
  // otherwise, call done without a user object

  User.findById(payload.user.id, function (err, user) {
    if (err) {
      return done(err, false);
    }
    if (user) {
      done(null, user);
    } else {
      done(null, false);
    }
  });
});
//Tell pasport to use this strategy
passport.use(jwtLogin);
passport.use(localLogin);
