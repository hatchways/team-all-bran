import React, { useContext, useEffect, useCallback } from 'react';
import * as imageURL from '../images/login-photo.png';
import Grid from '@material-ui/core/Grid';
import { useStyles } from '../themes/theme';
import { Redirect } from 'react-router-dom';
import { store } from '../context/store';
import { USER_LOADED } from '../context/types';
import { getUser } from '../utils/apiFunctions';

const LoginSignupWrapper = ({ children }) => {
  const classes = useStyles();
  const { dispatch, state } = useContext(store);

  const loadUser = useCallback(async () => {
    try {
      const res = await getUser();
      dispatch({
        type: USER_LOADED,
        payload: res.data,
      });
    } catch (err) {
      console.error(err);
    }
  }, [dispatch]);

  useEffect(() => {
    loadUser();
  }, [loadUser]);

  if (state.token) {
    return <Redirect to='/dashboard' />;
  }

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
