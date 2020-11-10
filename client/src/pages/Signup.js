import React, { useState, useContext } from 'react'
import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core/styles';

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
  console.log(email)
  console.log((/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/).test(email))
  return (
    <div>
      <form className={classes.form} noValidate autoComplete="off" onSubmit={onSubmit}>
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
        <button>Submit</button>
      </form>
    </div>
  )
}

export default Signup
