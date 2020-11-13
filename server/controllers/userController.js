const userModel = require('../models/User');
const validateRegister = require('../user-validation/register');
const validateLogin = require('../user-validation/login');
const { secretKey } = process.env;
const jwt = require('jsonwebtoken');

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

function createTokenResponse(user, res) {
  const payload = { user };
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

module.exports = { register, login };
