const User = require("../models/user");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
require("dotenv").config();

exports.signup = async function (req, res) {
  const { email, password } = req.body;
  // see if we are getting email and password

  if (!email || !password) {
    return res
      .status(422)
      .send({ error: "You must provide valid email and password" });
  }
  try {
    // See if a user with the given email exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(422).send({ error: "Email is in use" });
    }

    const newUser = new User({ email, password });
    console.log(newUser);
    await newUser.save();

    // const salt = await bcrypt.genSalt(10);
    // newUser.password = await bcrypt.hash(password, salt);

    const payload = {
      user: {
        id: newUser.id,
      },
    };

    jwt.sign(
      payload,
      process.env.JET_SECRET,
      { expiresIn: 10060000 },
      (err, token) => {
        if (err) throw err;
        res.json({ token });
      }
    );
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }

  // If a user with email does exits, return error
  //if a user with email does not exist, create and save user record
  //Respond to request indicating the user was created
};
