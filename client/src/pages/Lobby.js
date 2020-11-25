import React, { useState, useEffect, useContext } from 'react';
import { Redirect, useHistory } from 'react-router';
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
import { addUserToInterview, addInterviewQuestions } from '../utils/apiFunctions'

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction='up' ref={ref} {...props} />;
});

const Lobby = (props) => {
  const URL = `http://localhost:3000`;
  const classes = useStyles();
  const [copied, setCopied] = useState(false);

  const [open, setOpen] = useState(true);
  const [userData, setUserData] = useState([]);
  const [creatorId, setCreatorId] = useState(null);
  const [startInterview, setStartInterview] = useState(false);
  const [localState, setLocalState] = useState({
    alert: false,
    vertical: 'bottom',
    horizontal: 'center',
    message: null,
  });

  const history = useHistory();
  const roomId = history.location.pathname.split('/')[2];
  const { state } = useContext(store);
  const socket = state.socket;

  const handleClose = () => {
    setOpen(false);
  };

  const { vertical, horizontal, alert, message } = localState;

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
    socket.emit('start_interview', roomId);
  };

  useEffect(() => {
    let mounted = true;

    socket.emit('join_room', { user: state.user, roomId });
    socket.on('users', (users) => {
      if (users === 'full') {
        if (mounted) {
          showAlert({ message: 'This lobby is currently full' });
        }
        return;
      }
      if (Object.values(users).length === 1) {
        if (mounted) {
          setCreatorId(Object.values(users)[0]._id);
        }
      }
      if (mounted) {
        setUserData(Object.values(users));
      }
    });
    socket.on('waiting_room_disconnect_user', (users) => {
      if (mounted) {
        setUserData(Object.values(users));
      }
    })
    socket.on('join_interview_room', (users) => {
      if (mounted) {
        setStartInterview(true);
      }
    });
    return () => {
      mounted = false;
      socket.emit('waiting_room_disconnect');
    };
  }, [state.user]);

  if (!open) return <Redirect to='/dashboard' />;

  const getUserLobbyCountFull = () => {
    return (Object.keys(userData).length === 2);
  }

  const addUserAndQuestions = async () => {
    if (creatorId) {
      for (const user of userData) {
        if (user._id !== creatorId) {
          await addUserToInterview({ userId: user._id, roomId });
          await addInterviewQuestions(roomId);
        }
      }
    }
    history.push({
      pathname: `/interview/${roomId}`
    });
  }

  if (startInterview) {
    addUserAndQuestions();
    history.push({
      pathname: `/interview/${roomId}`
    })
  }

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
          <WaitingRoomUserList
            showStartButton={!alert}
            userData={userData}
            handleClose={handleClose}
          />
          {!alert && creatorId && getUserLobbyCountFull() && (
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
  );
};

export default Lobby;
