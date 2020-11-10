const Validator = require("validator");
const isEmpty = require("is-empty");

module.exports = function validateLogin(data) {
  let errors = {};

  // Convert empty fields to empty string
  data.email = !isEmpty(data.email) ? data.email : "";
  data.password = !isEmpty(data.password) ? data.password : "";

  // Check for empty strings and make sure valid data is given
  if (Validator.isEmpty(data.email)) {
    errors.email = "Email is required";
  } else if (!Validator.isEmail(data.email)) {
    errors.email = "Email is invalid";
  }

  if (Validator.isEmpty(data.password)) {
    errors.password = "Password is required";
  }

  return { errors, isValid: isEmpty(errors) };
};
