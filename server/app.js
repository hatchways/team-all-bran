const createError = require('http-errors');
const express = require('express');
const { join } = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const mongoose = require('mongoose');
const passport = require('passport');
const bodyParser = require('body-parser');
const connectDB = require('./config/db');
const cors = require('cors');
const indexRouter = require('./routes/index');
const pingRouter = require('./routes/ping');

const users = require('./routes/users');
const interviews = require('./routes/interviews');
const questions = require('./routes/questions');
const executeCode = require('./routes/executeCode');
const feedback = require('./routes/feedback');

const { json, urlencoded } = express;

var app = express();
app.use(cors({ origin: 'http://localhost:3000', credentials: true }));
// Connect to MongoDB
connectDB();

require('./config/passport')(passport);

app.use(logger('dev'));
app.use(json());
app.use(urlencoded({ extended: false }));
app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use(express.static(join(__dirname, 'public')));
// Passport middleware
app.use(passport.initialize());
// Passport config

app.use('/', indexRouter);
app.use('/ping', pingRouter);
app.use('/users', users);
app.use('/interviews', interviews);
app.use('/questions', questions);
app.use('/runCode', executeCode);
app.use('/feedback', feedback);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.json({ error: err });
});

module.exports = app;
