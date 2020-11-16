import React, { useState, useContext } from "react";
import TextField from "@material-ui/core/TextField";
import { Link, useHistory } from "react-router-dom";
import { RedirectPageButton, ContinueButton } from "../components/Buttons";
import { useStyles } from "../themes/theme";
import axios from "axios";
import { store } from "../context/store";
import { USER_LOADED } from "../context/types";
import Snackbar from "@material-ui/core/Snackbar";
import SnackbarContent from "@material-ui/core/SnackbarContent";

const LoginForm = () => {
  const history = useHistory();
  const classes = useStyles();
  const { dispatch } = useContext(store);

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [localState, setLocalState] = useState({
    open: false,
    vertical: "bottom",
    horizontal: "center",
    message: null,
  });

  const { vertical, horizontal, open, message } = localState;

  const showAlert = ({ message }) => {
    setLocalState({
      open: true,
      vertical: vertical,
      horizontal: horizontal,
      message,
    });
  };

  const handleClose = () => {
    setLocalState({ ...localState, open: false });
  };

  const onChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  const onSubmit = async (e) => {
    e.preventDefault();

    try {
      let result = await axios.post(
        "http://localhost:3001/users/login",
        formData
      );
      dispatch({ type: USER_LOADED, payload: result.data.user });
      history.push("/dashboard");
      const token = result.data.token;
      localStorage.setItem(process.env.REACT_APP_USER_DATA, token);
    } catch (error) {
      showAlert({ message: "Invalid credentials!" });
    }
  };

  return (
    <div>
      <div className={classes.signUpForm}>
        <div className={classes.loginContainer}>
          <div className={classes.alreadyHaveAccount}>
            Don't have an account?
          </div>
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
              value={formData.email}
              onChange={onChange}
            />
            <TextField
              required
              id="outlined-required"
              name="password"
              type="password"
              variant="outlined"
              label="Password"
              value={formData.password}
              onChange={onChange}
            />
            <ContinueButton onClick={onSubmit}>Continue</ContinueButton>
          </form>
        </div>
      </div>
      {open && (
        <Snackbar
          anchorOrigin={{ vertical, horizontal }}
          open={open}
          onClose={handleClose}
          message={message}
          key={vertical + horizontal}
        >
          <SnackbarContent
            style={{
              backgroundColor: "red",
              fontSize: "20px",
            }}
            message={message}
          />
        </Snackbar>
      )}
    </div>
  );
};

export default LoginForm;
