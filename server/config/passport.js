const JwtStrategy = require('passport-jwt').Strategy;
const mongoose = require('mongoose');

const User = mongoose.model('User');
require('dotenv').config();
const { secretKey } = process.env;

let cookieExtractor = (req) => {
  let token = null;
  if (req && req.cookies) {
    token = req.cookies['token'];
  }
  return token;
};

const opts = {};
opts.jwtFromRequest = cookieExtractor;
opts.secretOrKey = secretKey;

module.exports = (passport) => {
  passport.use(
    new JwtStrategy(opts, (jwt_payload, done) => {
      User.findById(jwt_payload.userId)
        .then((user) => {
          if (user) {
            return done(null, user);
          }
          return done(null, false);
        })
        .catch((err) =>
          console.error(
            'err from passport, something wrong with middleware',
            err
          )
        );
    })
  );
};
