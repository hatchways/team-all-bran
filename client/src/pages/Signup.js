import React, { useState, useContext } from 'react'
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import { withStyles } from '@material-ui/core/styles';
import * as imageURL from '../images/login-photo.png'
import { Link } from 'react-router-dom'
import Snackbar from '@material-ui/core/Snackbar'
import SnackbarContent from '@material-ui/core/SnackbarContent'

const useStyles = makeStyles((theme) => ({
  form: {
    '& .MuiTextField-root': {
      margin: theme.spacing(1),
      width: '25ch',
      length: '400ch',
      display: 'flex',
      flexDirection: 'column',
      marginBottom: '30px'
    }
  },
}));

const ContinueButton = withStyles({
  root: {
    background: 'linear-gradient(45deg, rgba(73, 94, 203, .8) 30%, rgba(73, 145, 203, .8) 90%)',
    color: 'white',
    height: 48,
    padding: '0 30px',
    boxShadow: '0 3px 5px 2px rgba(125, 123, 135, .3)',
    marginLeft: '10px'
  },
})(Button);

const LoginButton = withStyles({
  root: {
    background: 'linear-gradient(45deg, rgba(105, 105, 105, .8) 30%, rgba(169, 169, 169, .8) 90%)',
    color: 'white',
    height: '5ch',
    padding: '0 30px',
    boxShadow: '0 3px 5px 2px rgba(125, 123, 135, .3)',
    marginLeft: '10px'
  },
})(Button);

const styles = {
  root: {
    background: 'red'
  }
};

const Signup = () => {

  const classes = useStyles();

  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

  const [state, setState] = useState({
    open: false,
    vertical: 'bottom',
    horizontal: 'center',
    message: null
  });

  const { vertical, horizontal, open, message } = state;

  const { firstName, lastName, email, password, confirmPassword } = formData;

  const showAlert = ({ message }) => {
    setState({ open: true, vertical: vertical, horizontal: horizontal, message });
  }

  const handleClose = () => {
    setState({ ...state, open: false });
  }

  const onChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  }
  const onSubmit = async (e) => {
    e.preventDefault();
    // login(email, password);

    if (!areAllFieldsCompleted()) {
      showAlert({ message: "Must fill out every field!" })
      return
    }
    if (!passwordIsValid() && !emailIsValid()) {
      showAlert({ message: "Password & E-mail are invalid!" })
      return
    }
    if (!passwordIsValid() && password.length !== 0) {
      showAlert({ message: "Password is invalid!" })
      return
    }
    if (!emailIsValid() && email.length !== 0) {
      showAlert({ message: "E-mail is invalid!" })
      return
    }
    if (areAllFieldsCompleted() && emailIsValid && !passwordsAreTheSame()) {
      showAlert({ vertical: 'bottom', horizontal: 'center', message: "Passwords must match!" })
      return
    }
  };

  const passwordIsValid = () => {
    return password.length >= 6
  }

  const areAllFieldsCompleted = () => {
    return !(firstName.length === 0 || lastName.length === 0 || email.length === 0 || password.length === 0)

  }

  const emailIsValid = () => {
    return (/^[^\s@]+@[^\s@]+\.[^\s@]+$/).test(email)
  }

  const passwordsAreTheSame = () => {
    return password === confirmPassword
  }

  return (
    <div className='login-sign-up-container'>
      <img className='login-image' src={imageURL}></img>
      <div className="sign-up-form ">
        <div className="login-container">
          <div className='already-have-account'>Already have an account?</div>
          <Link
            style={{ textDecoration: 'none' }}
            to={{ pathname: '/Login' }}>
            <LoginButton size="small">Log in</LoginButton>
          </Link>
        </div>
        <div>
          <div className='get-started'>
            <h1>Get Started!</h1>
          </div>
          <form className={classes.form} noValidate autoComplete="off">
            <TextField
              required
              className={classes.textField}
              id="outlined-required"
              label="First name"
              variant="outlined"
              name="firstName"
              onChange={onChange}
              color='primary'
            />
            <TextField
              required
              id="outlined-required"
              label="Last name"
              variant="outlined"
              name="lastName"
              onChange={onChange}
              color='primary'
            />
            <TextField
              error={!emailIsValid() && email.length !== 0}
              id="standard-error-helper-text"
              name="email"
              variant="outlined"
              label='E-mail'
              onChange={onChange}
              helperText={"Must enter a valid e-mail address"}
              color='primary'
            />
            <TextField
              error={password.length > 0 && password.length < 6}
              id="standard-error-helper-text"
              name="password"
              type="password"
              variant="outlined"
              label='Password'
              helperText={"Password must be at least 6 characters long."}
              onChange={onChange}
              color='primary'
            />
            <TextField
              error={password !== confirmPassword}
              id="standard-error-helper-text"
              name="confirmPassword"
              type="password"
              variant="outlined"
              label='Confirm Password'
              helperText={"Must match password"}
              onChange={onChange}
              color='primary'
            />
            <ContinueButton onClick={onSubmit}>Continue</ContinueButton>
          </form>
        </div>
      </div>
      {open &&
        <Snackbar
          anchorOrigin={{ vertical, horizontal }}
          open={open}
          onClose={handleClose}
          message={message}
          key={vertical + horizontal}
        >
          <SnackbarContent style={{
            backgroundColor: 'red',
            fontSize: '20px'
          }}
            message={message}
          />
        </Snackbar>}
    </div>
  )
}

export default Signup
