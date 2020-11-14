import React, { useState, useContext } from 'react';
import TextField from '@material-ui/core/TextField';
import { Link, useHistory } from 'react-router-dom';
import { RedirectPageButton, ContinueButton } from '../components/Buttons';
import { useStyles } from '../themes/theme';
import api from '../utils/api';
import axios from 'axios';
import { store } from '../context/store';
import { LOGIN_SUCCESS, USER_LOADED } from '../context/types';

const LoginForm = () => {
  const history = useHistory();
  const classes = useStyles();
  const { state, dispatch } = useContext(store);

  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const loginUser = () => {
    try {
      // const res = await fetch(`http://localhost:3001/users/login`, JSON.stringify(formData))
      // const
      axios
        .post('http://localhost:3001/users/login', formData)
        .then((data) => console.log(data));
    } catch (err) {
      console.log('OUTPUT: LoginForm -> err', err);
    }
  };

  const onChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  const onSubmit = async (e) => {
    e.preventDefault();

    try {
      let result = await axios.post('http://localhost:3001/users/login', formData)
      dispatch({ type: USER_LOADED, payload: result.data.user })
      history.push('/dashboard')
    }
    catch (error) {
      console.log(error)
    }
  };

  return (
    <div className={classes.signUpForm}>
      <div className={classes.loginContainer}>
        <div className={classes.alreadyHaveAccount}>Don't have an account?</div>
        <Link style={{ textDecoration: 'none' }} to={{ pathname: '/signup' }}>
          <RedirectPageButton size='small'>SIGN UP</RedirectPageButton>
        </Link>
      </div>
      <div>
        <div className={classes.getStarted}>
          <h1>Sign In</h1>
        </div>
        <form className={classes.form} noValidate autoComplete='off'>
          <TextField
            required
            id='outlined-required'
            name='email'
            variant='outlined'
            label='E-mail'
            value={formData.email}
            onChange={onChange}
          />
          <TextField
            required
            id='outlined-required'
            name='password'
            type='password'
            variant='outlined'
            label='Password'
            value={formData.password}
            onChange={onChange}
          />
          <ContinueButton onClick={onSubmit}>Continue</ContinueButton>
        </form>
      </div>
    </div>
  );
};

export default LoginForm;
