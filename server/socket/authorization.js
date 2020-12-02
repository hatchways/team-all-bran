const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');

function authorization(socket, next) {
  const { token } = socket.request.cookies;

  try {
    const { userId } = jwt.verify(token, process.env.secretKey);
    if (mongoose.Types.ObjectId.isValid(userId)) {
      return next();
    }
  } catch (err) {
    return next(new Error(err));
  }
}

module.exports = { authorization };
