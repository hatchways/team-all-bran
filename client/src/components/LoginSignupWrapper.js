import React, { useContext, useEffect, useCallback } from 'react';
import * as imageURL from '../images/login-photo.png';
import Grid from '@material-ui/core/Grid';
import { useStyles } from '../themes/theme';
import { useHistory, Redirect } from 'react-router-dom';
import { store } from '../context/store';
import axios from 'axios';

const LoginSignupWrapper = ({ children }) => {
  const classes = useStyles();
  const history = useHistory();

  const getUserInfo = useCallback(async () => {
    try {
      await axios.get('http://localhost:3000/users/')
      history.push('/dashboard')
    } catch (error) {
    }
  }, []);

  useEffect(() => {
    getUserInfo();
  }, [getUserInfo]);


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
