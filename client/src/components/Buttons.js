import Button from '@material-ui/core/Button';
import { withStyles } from '@material-ui/core/styles';

export const ContinueButton = withStyles({
  root: {
    background: 'linear-gradient(45deg, rgba(73, 94, 203, .8) 30%, rgba(73, 145, 203, .8) 90%)',
    color: 'white',
    height: 48,
    padding: '0 30px',
    boxShadow: '0 3px 5px 2px rgba(125, 123, 135, .3)',
    marginLeft: '10px'
  },
})(Button);

export const LoginButton = withStyles({
  root: {
    background: 'linear-gradient(45deg, rgba(105, 105, 105, .8) 30%, rgba(169, 169, 169, .8) 90%)',
    color: 'white',
    height: '5ch',
    padding: '0 30px',
    boxShadow: '0 3px 5px 2px rgba(125, 123, 135, .3)',
    marginLeft: '10px'
  },
})(Button);

export const SignupButton = withStyles({
  root: {
    background: 'linear-gradient(45deg, rgba(105, 105, 105, .8) 30%, rgba(169, 169, 169, .8) 90%)',
    color: 'white',
    height: '5ch',
    padding: '0 30px',
    boxShadow: '0 3px 5px 2px rgba(125, 123, 135, .3)',
    marginLeft: '10px'
  },
})(Button);
