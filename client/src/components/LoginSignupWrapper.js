import React from 'react';
import * as imageURL from '../images/login-photo.png';
import Grid from '@material-ui/core/Grid';
import { useStyles } from '../themes/theme';

const LoginSignupWrapper = ({ children }) => {
  const classes = useStyles();

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
