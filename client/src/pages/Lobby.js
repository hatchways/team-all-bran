import React, { useState, useEffect, useContext } from 'react';
import { Redirect, useHistory, useParams } from 'react-router';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Slide from '@material-ui/core/Slide';
import { ContinueButton } from '../components/Buttons';
import { TextField } from '@material-ui/core';
import { store } from '../context/store';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import WaitingRoomUserList from '../components/WaitingRoomUserList';
import Snackbar from '@material-ui/core/Snackbar';
import SnackbarContent from '@material-ui/core/SnackbarContent';
import { useStyles } from '../themes/theme';
import SocketContext from '../context/socket';
import Interview from './Interview';

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction='up' ref={ref} {...props} />;
});

const Lobby = () => {
  const { state } = useContext(store);
  const socket = useContext(SocketContext);
  const { id: roomId } = useParams();
  const URL = `http://localhost:3000`;
  const classes = useStyles();
  const history = useHistory();
  const [startButtonPushed, setStartButtonPushed] = useState(false);
  const [copied, setCopied] = useState(false);
  const [open, setOpen] = useState(true);
  const [userData, setUserData] = useState(null);
  const [localState, setLocalState] = useState({
    alert: false,
    vertical: 'bottom',
    horizontal: 'center',
    message: null,
  });

  const { vertical, horizontal, alert, message } = localState;

  const handleClose = () => {
    setOpen(false);
  };

  const showAlert = ({ message }) => {
    setLocalState({
      alert: true,
      vertical: vertical,
      horizontal: horizontal,
      message,
    });
  };

  const handleAlertClose = () => {
    setLocalState({ ...localState, alert: false });
  };

  const handleStartInterview = () => {
    setStartButtonPushed(true);
    socket.emit('start_interview', roomId);
  };

  useEffect(() => {
    console.log('joining_room: ', roomId);
    if (state.user) {
      socket.emit('create_room', { user: state.user, roomId });
    }
    socket.on('lobby_users', ({ users }) => {
      setUserData(users);
    });

    return () => {
      console.log('left room: ', roomId);
    };
  }, [socket, roomId, state.user]);

  useEffect(() => {
    socket.on('join_interview_room', () => {
      setStartButtonPushed(true);
    });
  }, [socket]);

  if (!open) return <Redirect to='/dashboard' />;
  return !startButtonPushed ? (
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
              value={URL + history.location.pathname}
              id='outlined-basic'
              variant='outlined'
              disabled
            />
            <CopyToClipboard
              onCopy={() => setCopied(true)}
              text={URL + history.location.pathname}
            >
              <ContinueButton disabled={copied} color='primary'>
                {!copied ? 'COPY' : 'COPIED!'}
              </ContinueButton>
            </CopyToClipboard>
          </DialogActions>
          <DialogContent>
            <DialogContentText>Participants</DialogContentText>
          </DialogContent>
          {userData && (
            <WaitingRoomUserList
              showStartButton={!alert}
              userData={userData}
              handleClose={handleClose}
            />
          )}
          {!alert && (
            <ContinueButton onClick={handleStartInterview} color='primary'>
              Start
            </ContinueButton>
          )}
        </div>
      </Dialog>
      {open && (
        <Snackbar
          anchorOrigin={{ vertical, horizontal }}
          open={alert}
          onClose={handleAlertClose}
          message={message}
          key={vertical + horizontal}
        >
          <SnackbarContent
            style={{
              backgroundColor: 'red',
              fontSize: '20px',
            }}
            message={message}
          />
        </Snackbar>
      )}
    </>
  ) : (
    <Interview userData={userData} />
  );
};

export default Lobby;
