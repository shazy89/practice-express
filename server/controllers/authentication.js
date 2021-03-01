const User = require("../models/user");

exports.signup = async function (req, res) {
  const { email, password } = req.body;
  // See if a user with the given email exists
  try {
    let user = await User.findOne({ email });
    if (user) {
      return res.status(422).send({ error: "Email is in use" });
    }

    const newUser = new User({ email, password });
    await user.save();
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }

  // If a user with email does exits, return error
  //if a user with email does not exist, create and save user record
  //Respond to request indicating the user was created
};
