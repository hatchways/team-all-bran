import React from 'react'
import * as imageURL from '../images/login-photo.png'
import { useStyles } from '../themes/theme'

const LoginSignupWrapper = ({ children }) => {

  const classes = useStyles();

  return (
    <div className={classes.loginInSignUpContainer}>
      <img className={classes.loginImage} src={imageURL}></img>
      {children}
    </div>
  )
}

export default LoginSignupWrapper
