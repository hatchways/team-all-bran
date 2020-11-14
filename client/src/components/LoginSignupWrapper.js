import React, { useCallback, useContext, useEffect } from 'react';
import * as imageURL from '../images/login-photo.png';
import Grid from '@material-ui/core/Grid';
import { useStyles } from '../themes/theme';
import { Link, useHistory } from 'react-router-dom';
import { store } from '../context/store';
import { USER_LOADED } from '../context/types';

const LoginSignupWrapper = ({ children }) => {
  const history = useHistory();
  const classes = useStyles();
  const { dispatch } = useContext(store);

  const userIsLoggedIn = () => {
    return localStorage.getItem(process.env.REACT_APP_USER_DATA) !== null
  }

  const redirectToDashBoard = () => {
    const res = JSON.parse(localStorage.getItem(process.env.REACT_APP_USER_DATA))
    dispatch({
      type: USER_LOADED,
      payload: res,
    });
    history.push('/dashboard')
  }
  useEffect(() => {
    if (userIsLoggedIn()) {
      redirectToDashBoard()
    }
  }, [])
  return (
    <div className={classes.loginSignupWrapperRoot}>
      <Grid container spacing={2}>
        <Grid item xs>
          <img alt='' src={imageURL}></img>
        </Grid>
        <Grid className={classes.formField} item xs>
          {children}
        </Grid>
      </Grid>
    </div>
  );
};

export default LoginSignupWrapper;
