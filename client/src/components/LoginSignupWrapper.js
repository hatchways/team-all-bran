import React, { useEffect, useCallback } from 'react';
import * as imageURL from '../images/login-photo.png';
import Grid from '@material-ui/core/Grid';
import { useStyles } from '../themes/theme';
import { useHistory } from 'react-router-dom';
import { getUser } from '../utils/apiFunctions'

const LoginSignupWrapper = ({ children }) => {
  const classes = useStyles();
  const history = useHistory();

  const getUserInfo = useCallback(async () => {
    try {
      await getUser();
      history.push('/dashboard');
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
