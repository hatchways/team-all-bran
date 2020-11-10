const Validator = require("validator");
const isEmpty = require("is-empty");

module.exports = function validateRegister(data) {
  let errors = {};

  // Convert empty fields to empty string
  data.name = !isEmpty(data.name) ? data.name : "";
  data.email = !isEmpty(data.email) ? data.email : "";
  data.password = !isEmpty(data.password) ? data.password : "";

  // Check for empty strings and make sure valid data is given
  if (Validator.isEmpty(data.name)) {
    errors.name = "Name is required";
  }

  if (Validator.isEmpty(data.email)) {
    errors.email = "Email is required";
  } else if (!Validator.isEmail(data.email)) {
    errors.email = "Email is invalid";
  }

  if (Validator.isEmpty(data.password)) {
    errors.password = "Password is required";
  }

  if (!Validator.isLength(data.password, { min: 6, max: undefined })) {
    errors.password = "Password must be at least 6 characters";
  }

  return { errors, isValid: isEmpty(errors) };
};
