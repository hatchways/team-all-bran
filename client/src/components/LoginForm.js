import React, { useState } from "react";
import TextField from "@material-ui/core/TextField";
import { Link } from "react-router-dom";
import { RedirectPageButton, ContinueButton } from "./Buttons";
import { useStyles } from "../themes/theme";

const LoginForm = () => {
  const classes = useStyles();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const onChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  const onSubmit = async (e) => {
    e.preventDefault();
  };

  return (
    <div className={classes.signUpForm}>
      <div className={classes.loginContainer}>
        <div className={classes.alreadyHaveAccount}>Don't have an account?</div>
        <Link style={{ textDecoration: "none" }} to={{ pathname: "/signup" }}>
          <RedirectPageButton size="small">SIGN UP</RedirectPageButton>
        </Link>
      </div>
      <div>
        <div className={classes.getStarted}>
          <h1>Sign In</h1>
        </div>
        <form className={classes.form} noValidate autoComplete="off">
          <TextField
            required
            id="outlined-required"
            name="email"
            variant="outlined"
            label="E-mail"
            onChange={onChange}
          />
          <TextField
            required
            id="outlined-required"
            name="password"
            type="password"
            variant="outlined"
            label="Password"
            onChange={onChange}
          />
          <ContinueButton onClick={onSubmit}>Continue</ContinueButton>
        </form>
      </div>
    </div>
  );
};

export default LoginForm;
