const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
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
      required: true,
    },
    experience: {
      type: Number,
      required: true,
    },
    interviewLevel: {
      type: Number,
      required: true,
    },
    interviews: [
      {
        type: Schema.Types.ObjectId,
        ref: "Interview",
      },
    ],
  },
  opts
);

const User = mongoose.model("User", UserSchema);

async function registerUser(req) {
  // Check if email is in db
  const {
    email,
    firstName,
    lastName,
    password,
    language,
    experience,
    interviewLevel,
  } = req.body;
  const user = await User.findOne({ email });
  if (user) {
    return { error: "Email already exists" };
  }

  try {
    let newUser = new User({
      firstName,
      lastName,
      email,
      password,
      language,
      experience,
      interviewLevel,
    });
    newUser.password = bcrypt.hashSync(newUser.password, 10);
    newUser = await newUser.save();

    return { user: newUser };
  } catch (err) {
    return err.message;
  }
}

async function loginUser(req) {
  const { email, password } = req.body;

  // Find user by email
  const user = await User.findOne({ email }).populate("interviews");

  // Check if user exists
  if (!user) {
    return { error: "Username or password was incorrect" };
  }

  let validPass = await bcrypt.compare(password, user.password);

  if (validPass) {
    return { user };
  } else {
    return { error: "Username or password was incorrect" };
  }
}

function updateUser(id, req) {
  const userId = id;
  const lang = req.body.language;
  const experience = req.body.experience;
  const interviewLevel = req.body.interviewLevel;

  return User.findOneAndUpdate(
    { _id: userId },
    {
      $set: {
        language: lang,
        experience: experience,
        interviewLevel: interviewLevel,
      },
    },
    { new: true },
    (err, doc) => {
      if (err) {
        return err;
      }
      return { user: doc };
    }
  );
}

module.exports = { User, registerUser, loginUser, updateUser };
