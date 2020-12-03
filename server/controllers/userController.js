const userModel = require('../models/User');
const validateRegister = require('../user-validation/register');
const validateLogin = require('../user-validation/login');
const { secretKey } = process.env;
const jwt = require('jsonwebtoken');

const { User } = require('../models/User');
const upload = require('../services/ImageUpload');
const singleUpload = upload.single('image');

function register(req, res) {
  const { errors, isValid } = validateRegister(req.body);

  //validate registration
  if (!isValid) {
    return res.status(400).json(errors);
  }

  let user = userModel.registerUser(req);
  user.then((data) => {
    if (data.error) {
      res.status(400).json({ error: data.error });
    } else {
      createTokenResponse(data.user, res);
    }
  });
}

function login(req, res) {
  const { errors, isValid } = validateLogin(req.body);

  //validate registration
  if (!isValid) {
    return res.status(400).json(errors);
  }

  let user = userModel.loginUser(req);
  user.then((data) => {
    if (data.error) {
      res.status(400).json({ error: data.error });
    } else {
      createTokenResponse(data.user, res);
    }
  });
}

function logout(req, res) {
  res.clearCookie('token');
  return res.sendStatus(200);
}

function editUser(req, res) {
  const id = req.params.userId;
  let user = userModel.updateUser(id, req);

  user
    .then((data) => {
      res.json({ user: data });
    })
    .catch((err) => {
      res.json({ error: err });
    });
}

function getUser(req, res) {
  res.status(200).json({ user: req.user });
}

async function updateProfilePic(req, res) {
  const userId = req.user._id;

  singleUpload(req, res, async (err) => {
    if (err) {
      return res.status(400).json({ errors: err });
    }

    try {
      const user = await User.findById(userId);
      user.profilePicture = req.file.location;
      await user.save();
      res.json({ user: user });
    } catch (err) {
      res.status(400).json({ error: err });
    }
  });
}

function createTokenResponse(user, res) {
  const payload = { userId: user._id };
  return jwt.sign(
    payload,
    secretKey,
    {
      expiresIn: 2629744, // 1 month in seconds
    },
    (err, token) => {
      let responseObj = { user, token };
      res
        .status(201)
        .cookie('token', token, { httpOnly: true })
        .json(responseObj);
    }
  );
}

module.exports = {
  register,
  login,
  editUser,
  getUser,
  logout,
  updateProfilePic,
};
