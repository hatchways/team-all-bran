const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const Schema = mongoose.Schema;

// Create Schema
const UserSchema = new Schema({
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
});

const User = mongoose.model("users", UserSchema);

function registerUser(req) {
  // Check if email is in db
  return User.findOne({ email: req.body.email }).then((user) => {
    if (user) {
      return { error: "Email already exists" };
    } else {
      const newUser = new User({
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        password: req.body.password,
      });

      newUser.password = bcrypt.hashSync(newUser.password, 10);

      newUser.save();
      return { user: newUser };
    }
  });
}

function loginUser(req) {
  const email = req.body.email;
  const password = req.body.password;

  // Find user by email
  return User.findOne({ email }).then((user) => {
    // Check if user exists
    if (!user) {
      return { error: "Username and password was incorrect" };
    }

    let validPass = bcrypt.compareSync(password, user.password);

    if (validPass) {
      return { user: user };
    } else {
      return { error: "Username and password was incorrect" };
    }
  });
}

module.exports = { User, registerUser, loginUser };
