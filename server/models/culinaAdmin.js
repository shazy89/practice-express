const mongoose = require("mongoose");

const Schema = mongoose.Schema;
const bcrypt = require("bcryptjs");

//Define our model
const adminSchema = new Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  name: String,
  lastName: String,
  mobileNumber: String,
  salary: String,
  position: String,
  date: { type: Date, default: Date.now },
});

//On Save Hook , encrypt password
//   -------- before user get saved run the function ------
//userSchema.pre("save", function () {
//  const user = this; // user - email or password
//
//  try {
//    const salt = await bcrypt.genSalt(10);
//    user.password = await bcrypt.hash(password, salt);
//  } catch (error) {
//    console.error(err.message);
//    res.status(500).send("Server error");
//  }
//
//  //  const salt = await bcrypt.genSalt(10);
//  //  user.password = await bcrypt.hash(password, salt);
//});
adminSchema.pre("save", function (next) {
  const user = this;
  //  if(!user.isDirectModified('password')){
  //      return next()
  //  }
  bcrypt.genSalt(10, (err, salt) => {
    if (err) next(err);
    bcrypt.hash(user.password, salt, (err, hash) => {
      if (err) next(err);
      user.password = hash;
      next();
    });
  });
});
module.exports = CulinaAdmin = mongoose.model("adminCulina", adminSchema);
