const createError = require("http-errors");
const express = require("express");
const { join } = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const mongoose = require("mongoose");
const passport = require("passport");

const indexRouter = require("./routes/index");
const pingRouter = require("./routes/ping");

const users = require("./routes/users");

const { json, urlencoded } = express;

const db = "mongodb://localhost:27017/all_bran"; // To be changed to get from env

// Connect to MongoDB
mongoose
  .connect(db, { useNewUrlParser: true })
  .then(() => console.log("Connected to database"))
  .catch((err) => console.log(err));

var app = express();

app.use(logger("dev"));
app.use(json());
app.use(urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(join(__dirname, "public")));
// Passport middleware
app.use(passport.initialize());
// Passport config
require("./config/passport")(passport);

app.use("/", indexRouter);
app.use("/ping", pingRouter);
app.use("/users", users);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.json({ error: err });
});

module.exports = app;
