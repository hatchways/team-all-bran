import React, { useState, useEffect, useContext } from 'react';
import { Redirect, useHistory } from 'react-router';
import socketIOClient from 'socket.io-client';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Slide from '@material-ui/core/Slide';
import { ContinueButton, StartDashboardButton } from '../components/Buttons';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ListItemText from '@material-ui/core/ListItemText';
import Avatar from '@material-ui/core/Avatar';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import avatar from '../images/avatar.png';
import { useStyles } from '../themes/theme';
import { Input, InputLabel } from '@material-ui/core';
import { store } from '../context/store';

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction='up' ref={ref} {...props} />;
});

const Lobby = () => {
  const classes = useStyles();
  const ENDPOINT = '/';
  const [open, setOpen] = React.useState(true);

  const handleClose = () => {
    setOpen(false);
  };

  const [response, setResponse] = useState('');
  const history = useHistory();

  useEffect(() => {
    const socket = socketIOClient(ENDPOINT);
    socket.on('FromAPI', (data) => {
      setResponse(data);
    });
    return () => socket.disconnect();
  }, []);
  console.log('CHECKING FOR PATHNAME', history.location.pathname);

  if (!open) return <Redirect to='/dashboard' />;

  const youAreEl = `http://localhost:3000`;

  return (
    <div>
      <p>
        It's <time dateTime={response}>{response}</time>
      </p>

      <Dialog
        open={open}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
        aria-labelledby='alert-dialog-slide-title'
        aria-describedby='alert-dialog-slide-description'
      >
        <div>
          <DialogTitle id='alert-dialog-slide-title'>Waiting Room</DialogTitle>
          <DialogActions>
            <Input onChange={() => {}} value={youAreEl + history.location.pathname}>
              <InputLabel>Copy Link</InputLabel>
            </Input>
            <ContinueButton onClick={handleClose} color='primary'>
              COPY
            </ContinueButton>
          </DialogActions>
          <DialogContent>
            <DialogContentText id='alert-dialog-slide-description'></DialogContentText>
          </DialogContent>
          <UserList handleClose={handleClose} />
        </div>
      </Dialog>
    </div>
  );
};

export default Lobby;

const UserList = ({ handleClose }) => {
  const { state } = useContext(store);
  const classes = useStyles();

  return (
    <Grid>
      <Grid>
        <div className={classes.demo}>
          <List>
            <ListItem>
              <>
                <Avatar alt='' img={avatar}>
                  {' '}
                </Avatar>
              </>
              <ListItemText
                primary={state.user.firstName + ' ' + state.user.lastName}
              />
            </ListItem>
          </List>
          <ContinueButton onClick={handleClose} color='primary'>
            Start
          </ContinueButton>
        </div>
      </Grid>
    </Grid>
  );
};
