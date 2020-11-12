import { createMuiTheme } from "@material-ui/core"
import { makeStyles } from '@material-ui/core/styles'

export const theme = createMuiTheme({
  typography: {
    fontFamily: '"Roboto"',
    fontSize: 12,
    h1: {
      // could customize the h1 variant as well
    }
  },
  palette: {
    primary: { main: "#DF1B1B" }
  }
})

export const useStyles = makeStyles((theme) => ({
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
  signUpForm: {
    marginLeft: '40px',
    display: 'flex',
    width: '30%',
  },
  loginImage: {
    float: 'left',
    paddingRight: '40px',
  },
  loginInSignUpContainer: {
    display: 'flex',
    justifyContent: 'center',
    alignContent: 'center',
    position: 'fixed',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: '100%',
  },
  getStarted: {
    color: '#484848',
    marginLeft: '10px',
  },
  loginContainer: {
    width: 'inherit',
    top: '0',
    position: 'fixed',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginTop: '20px'
  },
  alreadyHaveAccount: {
    display: 'flex',
    justifyContent: 'center',
    flexDirection: 'column',
    fontStyle: 'italic',
  },
  loginSignupWrapperRoot: {
    flexGrow: 1,
    overflow: 'hidden',
  },
  formField: {
    display: 'flex',
    justifyContent: 'center',
    alignContent: 'center',
    flexDirection: 'column'
  }
}))

export const colors = {
  darkBlue: 'rgba(73, 94, 203, .8)',
  lightBlue: 'rgba(73, 145, 203, .8)',
  darkGray: 'rgba(105, 105, 105, .8)',
  lightGray: 'rgba(169, 169, 169, .8)',
  shadow: 'rgba(125, 123, 135, .3)'
}
