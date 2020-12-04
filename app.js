const createError = require('http-errors');
const express = require('express');
const { join } = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const mongoose = require('mongoose');
const passport = require('passport');
const bodyParser = require('body-parser');
const connectDB = require('./config/db');
const indexRouter = require('./routes/index');
const pingRouter = require('./routes/ping');
const cors = require('cors');

// Connect to MongoDB
connectDB();

const users = require('./routes/users');
const interviews = require('./routes/interviews');
const questions = require('./routes/questions');
const feedback = require('./routes/feedback');
const executeCode = require('./routes/executeCode');

const { json, urlencoded } = express;

var app = express();

require('./config/passport')(passport);

app.use(cors());
app.use(logger('dev'));
app.use(json());
app.use(urlencoded({ extended: false }));
app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// Passport middleware
app.use(passport.initialize());

if (process.env.NODE_ENV === 'production') {
  app.use((req, res, next) => {
    if (req.header('x-forwarded-proto') !== 'https')
      res.redirect(`https://${req.header('host')}${req.url}`);
    else next();
  });
}

app.use('/', indexRouter);
app.use('/ping', pingRouter);
app.use('/users', users);
app.use('/interviews', interviews);
app.use('/questions', questions);
app.use('/feedback', feedback);
app.use('/runCode', executeCode);

app.use(express.static(join(__dirname, 'client', 'build')));
app.get('/*', (req, res) => {
  res.sendFile(path.join(__dirname, 'client', 'build', 'index.html'));
});

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
