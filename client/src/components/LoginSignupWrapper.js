import React, { useContext, useEffect, useCallback } from 'react';
import * as imageURL from '../images/login-photo.png';
import Grid from '@material-ui/core/Grid';
import { useStyles } from '../themes/theme';
import { useHistory } from 'react-router-dom';
import { store } from '../context/store';
import { USER_LOADED } from '../context/types';
import axios from 'axios'

const LoginSignupWrapper = ({ children }) => {
  const history = useHistory();
  const classes = useStyles();
  const { dispatch, state } = useContext(store);

  const redirectToDashBoard = useCallback(async () => {
    try {
      let result = await axios.get('http://localhost:3001/users/', {
        params: {
          token: state.token
        }
      })

      dispatch({
        type: USER_LOADED,
        payload: result.data.user,
      });

      history.push('/dashboard')
    }
    catch (error) {
      console.log(error)
    }
  }, [dispatch, history, state.token])

  useEffect(() => {
    if (state.token) {
      redirectToDashBoard()
    }
  }, [redirectToDashBoard, state.token])

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
