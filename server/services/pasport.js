const passport = require("passport");
const User = require("../models/user");
require("dotenv").config();
const JwtStrategy = require("passport-jwt").Strategy; //extract this properties
const ExtractJwt = require("passport-jwt").ExtractJwt; //extract this properties
const LocalStrategy = require("passport-local");

//Setup options for JWT Strategy

const jwtOptions = {};

//Create Jwt strategy

const jwtLogin = new JwtStrategy(jwtOptions, function (payload, done) {
  // payload argument is decoded jwt token
  // done argument is function
  // See if the user Id in the payload exists in our database
  // If its does, call 'done' with that other
  //Othervise, call done without a user object
  User.findById(payload.sub, function (err, user) {
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
