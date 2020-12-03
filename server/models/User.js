const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const Schema = mongoose.Schema;

const opts = {
  // Make Mongoose use Unix time (seconds since Jan 1, 1970)
  timestamps: { currentTime: () => Math.floor(Date.now() / 1000) },

  // Any doc -> Object or JSON will not include the password
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
};

// Create Schema
const UserSchema = new Schema(
  {
    createdAt: Number,
    updatedAt: Number,
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
    language: {
      type: String,
    },
    experience: {
      type: Number,
    },
    interviewLevel: {
      type: Number,
    },
    profilePicture: {
      type: String,
    },
    interviews: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Interview',
      },
    ],
  },
  opts
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

    return { user: newUser };
  } catch (err) {
    return { error: err.message };
  }
}

async function loginUser(req) {
  const { email, password } = req.body;

  // Find user by email
  const user = await User.findOne({ email }).populate('interviews');

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

async function updateUser(id, req) {
  const userId = id;
  const lang = req.body.language;
  const experience = req.body.experience;
  const interviewLevel = req.body.interviewLevel;

  try {
    const user = await User.findOne({ _id: userId });

    if (lang) {
      user.language = lang;
    }

    if (experience) {
      user.experience = experience;
    }

    if (interviewLevel) {
      user.interviewLevel = interviewLevel;
    }

    await user.save();

    return user;
  } catch (err) {
    return err;
  }
}

module.exports = { User, registerUser, loginUser, updateUser };
