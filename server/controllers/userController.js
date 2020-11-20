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
      res.json({ error: 'User id not found' });
    });
}

async function getUser(req, res, next) {
  // Get token from header
  const token = req.query.token ? req.query.token : req.cookies.token;

  // Check if no token
  if (!token) {
    return res.status(401).json({ msg: 'No token, authorization denied' });
  }

  try {
    // Verify token
    const id = await jwt.verify(token, process.env.secretKey).user._id;
    // Return user interviews here
    const user = await User.findById(id).populate('interviews');
    const userObject = user.toJSON();
    userObject.token = token;
    res.status(200).json({ user: userObject });
  } catch (err) {
    res.status(401).json({ error: 'Token is not valid' });
  }
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

module.exports = { register, login, editUser, getUser, logout };
