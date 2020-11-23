const userModel = require('../models/User');
const validateRegister = require('../user-validation/register');
const validateLogin = require('../user-validation/login');
const { secretKey } = process.env;
const jwt = require('jsonwebtoken');
const { User } = require('../models/User');

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

function editUser(req, res) {
  const id = req.params.userId;
  let user = userModel.updateUser(id, req);

  user
    .then((data) => {
      res.json({ user: data });
    })
    .catch((err) => {
      res.json({ error: 'User id not found' });
    });
}

async function getUser(req, res, next) {
  const { token } = req.cookies;
  const { secretKey } = process.env;
  try {
    // Verify token
    const id = await jwt.verify(token, secretKey).user._id;

    const user = await User.findById(id);

    res.status(200).json({ user, token });

    // Return user interviews here
  } catch (err) {
    res.status(401).json({ error: 'Token is not valid' });
  }
}

function createTokenResponse(user, res) {
  const payload = user._id;
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
        .cookie('token', token, { httpOnly: true, sameSite: 'lax' })
        .json(responseObj);
    }
  );
}

function logout(req, res) {
  res.clearCookie('token');
  return res.sendStatus(200);
}

module.exports = { register, login, editUser, getUser, logout };
