import React, { useState } from 'react';
import TextField from '@material-ui/core/TextField';
import { Link } from 'react-router-dom';
import { RedirectPageButton, ContinueButton } from '../components/Buttons';
import { useStyles } from '../themes/theme';
import Snackbar from '@material-ui/core/Snackbar';
import SnackbarContent from '@material-ui/core/SnackbarContent';

import UserInformation from '../components/UserInformation';

const SignupForm = () => {
  const classes = useStyles();

  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

  const [localState, setLocalState] = useState({
    open: false,
    vertical: 'bottom',
    horizontal: 'center',
    continueButtonPushed: false,
    message: null,
  });

  const { vertical, horizontal, open, message, continueButtonPushed } = localState;

  const { firstName, lastName, email, password, confirmPassword } = formData;

  const showAlert = ({ message }) => {
    setLocalState({
      ...localState,
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

  const continueClicked = async (e) => {
    e.preventDefault();

    if (displayAlertMessage()) {
      return;
    }

    setLocalState({
      ...localState,
      continueButtonPushed: !continueButtonPushed,
    });
  };

  const displayAlertMessage = () => {
    if (!areAllFieldsCompleted()) {
      showAlert({ message: 'Must fill out every field!' });
      return true;
    }
    if (!passwordIsValid() && !emailIsValid()) {
      showAlert({ message: 'Password & E-mail are invalid!' });
      return true;
    }
    if (!passwordIsValid() && password.length !== 0) {
      showAlert({ message: 'Password is invalid!' });
      return true;
    }
    if (!emailIsValid() && email.length !== 0) {
      showAlert({ message: 'E-mail is invalid!' });
      return true;
    }
    if (areAllFieldsCompleted() && emailIsValid && !passwordsAreTheSame()) {
      showAlert({
        vertical: 'bottom',
        horizontal: 'center',
        message: 'Passwords must match!',
      });
      return true;
    }

    return false;
  };

  const passwordIsValid = () => {
    return password.length >= 6;
  };

  const areAllFieldsCompleted = () => {
    return !(
      firstName.length === 0 ||
      lastName.length === 0 ||
      email.length === 0 ||
      password.length === 0
    );
  };

  const emailIsValid = () => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  const passwordsAreTheSame = () => {
    return password === confirmPassword;
  };

  return !continueButtonPushed ? (
    <div className={classes.signUpForm}>
      <div className={classes.loginContainer}>
        <div className={classes.alreadyHaveAccount}>Already have an account?</div>
        <Link style={{ textDecoration: 'none' }} to={{ pathname: '/login' }}>
          <RedirectPageButton size='small'>Log in</RedirectPageButton>
        </Link>
      </div>
      <div>
        <div className={classes.getStarted}>
          <h1>Get Started!</h1>
        </div>
        <form className={classes.form} noValidate autoComplete='off'>
          <TextField
            required
            className={classes.textField}
            id='outlined-required'
            label='First name'
            variant='outlined'
            name='firstName'
            onChange={onChange}
            color='primary'
          />
          <TextField
            required
            id='outlined-required'
            label='Last name'
            variant='outlined'
            name='lastName'
            onChange={onChange}
            color='primary'
          />
          <TextField
            error={!emailIsValid() && email.length !== 0}
            id='standard-error-helper-text'
            name='email'
            variant='outlined'
            label='E-mail'
            onChange={onChange}
            helperText={'Must enter a valid e-mail address'}
            color='primary'
          />
          <TextField
            error={password.length > 0 && password.length < 6}
            id='standard-error-helper-text'
            name='password'
            type='password'
            variant='outlined'
            label='Password'
            helperText={'Password must be at least 6 characters long.'}
            onChange={onChange}
            color='primary'
          />
          <TextField
            error={password !== confirmPassword}
            id='standard-error-helper-text'
            name='confirmPassword'
            type='password'
            variant='outlined'
            label='Confirm Password'
            helperText={'Must match password'}
            onChange={onChange}
            color='primary'
          />
          <ContinueButton onClick={continueClicked}>Continue</ContinueButton>
        </form>
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
              backgroundColor: 'red',
              fontSize: '20px',
            }}
            message={message}
          />
        </Snackbar>
      )}
    </div>
  ) : (
    <UserInformation formData={formData} />
  );
};

export default SignupForm;

// ) => {
//   displayAlertMessage();
//   setLocalState({ continueButtonPushed: true });
// }
