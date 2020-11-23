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
import { theme, useStyles } from '../themes/theme';
import { Input, InputLabel, TextField } from '@material-ui/core';
import { store } from '../context/store';
import { CopyToClipboard } from 'react-copy-to-clipboard';

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
  const [copied, setCopied] = useState(false);
  const [userData, setUserData] = useState('');
  const history = useHistory();

  const { state, dispatch } = useContext(store);
  console.log(state.user);

  useEffect(() => {
    const socket = socketIOClient(ENDPOINT);
    socket.emit('join_lobby', state.user);
    socket.on('users', (users) => {
      setUserData(Object.values(users));
    });
    return () => socket.disconnect();
  }, []);

  console.log('CHECKING FOR PATHNAME', history.location.pathname);

  if (!open) return <Redirect to='/dashboard' />;

  const youAreEl = `http://localhost:3000`;

  return (
    <>
      <Dialog
        className={classes.waitingRoomDialogue}
        open={open}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
        aria-labelledby='alert-dialog-slide-title'
        aria-describedby='alert-dialog-slide-description'
      >
        <div className={classes.formControlWaitingRoom}>
          <DialogTitle id='alert-dialog-slide-title'>Waiting Room</DialogTitle>
          <p>
            <strong>Share link</strong>
          </p>
          <DialogActions>
            <TextField
              fullWidth
              value={youAreEl + history.location.pathname}
              id='outlined-basic'
              variant='outlined'
              disabled
              color={theme.colors.darkBlue}
            />
            <CopyToClipboard
              onCopy={() => setCopied(true)}
              text={youAreEl + history.location.pathname}
            >
              <ContinueButton color='primary'>COPY</ContinueButton>
            </CopyToClipboard>
          </DialogActions>
          <DialogContent>
            <DialogContentText>Participants</DialogContentText>
          </DialogContent>
          <UserList userData={userData} handleClose={handleClose} />
          <ContinueButton onClick={handleClose} color='primary'>
            Start
          </ContinueButton>
        </div>
      </Dialog>
    </>
  );
};

export default Lobby;

const UserList = ({ handleClose, userData }) => {
  const { state } = useContext(store);
  const classes = useStyles();

  return (
    <Grid>
      <Grid>
        <div className={classes.demo}>
          <List>
            <div>
              {userData ? (
                userData.map(({ firstName, lastName }, index) => {
                  return (
                    <ListItem className={classes.waitingRoomUser} key={index}>
                      <Avatar alt='Avatar' src={avatar} />
                      <div
                        className={classes.waitingRoomUserName}
                      >{`${firstName} ${lastName}`}</div>
                    </ListItem>
                  );
                })
              ) : (
                <p>Empty</p>
              )}
            </div>
          </List>
        </div>
      </Grid>
    </Grid>
  );
};
