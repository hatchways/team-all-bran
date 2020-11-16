const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const Schema = mongoose.Schema;

// Create Schema
const UserSchema = new Schema(
  {
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
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    interviewLevel: {
      type: Number,
    },
    professionalExperience: {
      type: Number,
    },
    interviews: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Interview',
      },
    ],
  },
  {
    toObject: {
      transform: function (doc, ret) {
        delete ret.password;
      },
    },
    toJSON: {
      transform: function (doc, ret) {
        delete ret.password;
      },
    },
  }
);

const User = mongoose.model('User', UserSchema);

async function registerUser(req) {
  // Check if email is in db
  const { email, firstName, lastName, password } = req.body;
  const user = await User.findOne({ email });
  if (user) {
    return { error: 'Email already exists' };
  }

  try {
    let newUser = new User({
      firstName,
      lastName,
      email,
      password,
    });
    newUser.password = bcrypt.hashSync(newUser.password, 10);
    newUser = await newUser.save();
    // console.log(newUser);
    return { user: newUser };
  } catch (err) {
    return err.message;
  }
}

async function loginUser(req) {
  const { email, password } = req.body;

  // Find user by email
  const user = await User.findOne({ email }).populate('interviews');
  console.log(user);
  // Check if user exists
  if (!user) {
    return { error: 'Username or password was incorrect' };
  }

  let validPass = await bcrypt.compare(password, user.password);

  if (validPass) {
    return { user };
  } else {
    return { error: 'Username or password was incorrect' };
  }
}

module.exports = { User, registerUser, loginUser };