import React, { useState, useContext } from 'react'
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import { withStyles } from '@material-ui/core/styles';
import * as imageURL from '../images/login-photo.png'
import { Link } from 'react-router-dom'

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

const Signup = () => {

  const classes = useStyles();

  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: ''
  });

  const { firstName, lastName, email, password } = formData;

  const onChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  }
  const onSubmit = async (e) => {
    e.preventDefault();
    // login(email, password);
  };

  const passwordIsValid = () => {
    if (password.length >= 6) {
      return true
    } else {
      return false
    }
  }

  const areAllFieldsCompleted = () => {
    if (firstName.length === 0 || firstName.length === 0 || firstName.length === 0 || firstName.length === 0) {
      return false
    } else {
      return true
    }
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
              color='secondary'
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
              error={!(/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/).test(email) && email.length !== 0}
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
            <ContinueButton onClick={onSubmit}>Continue</ContinueButton>
          </form>
        </div>
      </div>
    </div>
  )
}

export default Signup
