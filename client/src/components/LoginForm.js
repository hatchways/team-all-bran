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
  const onSubmit = (e) => {
    e.preventDefault();
    var myHeaders = new Headers();
    myHeaders.append('Content-Type', 'application/x-www-form-urlencoded');
    myHeaders.append(
      'Cookie',
      'token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImludGVydmlld3MiOlt7Il9pZCI6IjVmYWViYzczY2M1NDA4Y2MxODI5M2MzZiIsImNyZWF0b3IiOiI1ZmFlYjQ3MjY0MzIwOWNhMGJhNDZjYjAiLCJzdGFydFRpbWUiOiIyMDIwLTExLTEzVDE3OjAzOjQ3LjU4OFoiLCJfX3YiOjB9XSwiX2lkIjoiNWZhZWI0NzI2NDMyMDljYTBiYTQ2Y2IwIiwiZmlyc3ROYW1lIjoiS2V2aW4iLCJsYXN0TmFtZSI6IllpIiwiZW1haWwiOiJzdGV2ZTFAZ21haWwuY29tIiwiX192IjoxfSwiaWF0IjoxNjA1MzE2OTU5LCJleHAiOjE2MDc5NDY3MDN9.uCBTpucGpN8SIsrviifeHSbVdYH7ztfm3FZjIXrA-pw'
    );

    var urlencoded = new URLSearchParams();
    urlencoded.append('email', formData.email);
    urlencoded.append('password', formData.password);

    var requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: urlencoded,
      redirect: 'follow',
    };

    fetch('http://localhost:3001/users/login', requestOptions)
      .then((response) => response.json())
      .then((result) => dispatch({ type: USER_LOADED, payload: result }))
      .then((data) => history.push('/dashboard'))
      .catch((error) => console.log('error', error));
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
