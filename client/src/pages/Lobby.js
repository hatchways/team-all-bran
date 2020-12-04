import React, { useState, useEffect, useContext } from 'react';
import { Redirect, useHistory, useParams } from 'react-router';
import {
  Dialog,
  Slide,
  TextField,
  Snackbar,
  SnackbarContent,
  Box,
  IconButton,
} from '@material-ui/core/';
import CloseIcon from '@material-ui/icons/Close';

import { CopyButton, CustomButton } from '../components/Buttons';
import { store } from '../context/store';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import WaitingRoomUserList from '../components/WaitingRoomUserList';
import { colors, useStyles } from '../themes/theme';
import SocketContext from '../context/socket';

import {
  addUserToInterview,
  addInterviewQuestions,
  getInterview,
} from '../utils/apiFunctions';

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction='up' ref={ref} {...props} />;
});

const Lobby = () => {
  const { state } = useContext(store);
  const socket = useContext(SocketContext);
  const { id: roomId } = useParams();
  const URL =
    process.env.NODE_ENV === 'production'
      ? `https://mock-interview-platform.herokuapp.com`
      : `http://localhost:3000`;
  const classes = useStyles();
  const history = useHistory();
  const [startButtonPushed, setStartButtonPushed] = useState(false);
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

  const { vertical, horizontal, alert, message } = localState;

  const handleClose = () => {
    socket.emit('leave_lobby', { userId: state.user._id, roomId });
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

  const handleStartInterview = async () => {
    setStartInterview(true);
    await addUserAndQuestions();
    socket.emit('start_interview', roomId);
  };

  useEffect(() => {
    console.log('joining_room: ', roomId);
    if (state.user) {
      socket.emit('create_room', { user: state.user, roomId });
    }
    socket.on('lobby_users', ({ users }) => {
      setUserData(Object.values(users));

      if (Object.values(users).length === 1) {
        setCreatorId(Object.values(users)[0]._id);
      }
    });

    socket.on('room_full', () => {
      showAlert({ message: 'Room is full, start your own?' });
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

  const getUserLobbyCountFull = () => {
    return Object.keys(userData).length === 2;
  };

  const addUserAndQuestions = async () => {
    const {
      data: { interview },
    } = await getInterview(roomId);
    const creator = interview.users && interview.users[0].user._id;
    setCreatorId(creator);

    if (creator) {
      for (const user of userData) {
        if (user._id !== creator) {
          await addUserToInterview({ userId: user._id, roomId });
          await addInterviewQuestions(roomId);
        }
      }
    }
    setStartButtonPushed(true);
  };

  if (startButtonPushed) {
    return <Redirect to={`/interview/${roomId}`} />;
  }

  return (
    <>
      <Dialog
        maxWidth='md'
        open={open}
        TransitionComponent={Transition}
        keepMounted
        aria-labelledby='alert-dialog-slide-title'
        aria-describedby='alert-dialog-slide-description'
      >
        <div className={classes.formControlWaitingRoom}>
          <IconButton
            aria-label='close'
            className={classes.closeButton}
            onClick={handleClose}
          >
            <CloseIcon />
          </IconButton>
          <div className={classes.waitingRoomDialogueTitle}>Waiting Room</div>
          <p className={classes.shareLink}>Share link</p>
          <div className={classes.linkAndCopy}>
            <TextField
              maxWidth='lg'
              className={classes.urlBox}
              InputProps={{
                classes: {
                  input: classes.urlLink,
                },
              }}
              value={URL + history.location.pathname}
              id='outlined-basic'
              variant='outlined'
              disabled
            />
            <CopyToClipboard
              onCopy={() => setCopied(true)}
              text={URL + history.location.pathname}
            >
              <CopyButton size='large' disabled={copied} color='primary'>
                {!copied ? 'COPY' : 'COPIED!'}
              </CopyButton>
            </CopyToClipboard>
          </div>
          <div className={classes.participantsTitle}>Participants</div>
          <Box
            className={classes.participantsBox}
            border={1}
            color={colors.lightGray}
          >
            <WaitingRoomUserList
              showStartButton={!alert}
              userData={userData}
              handleClose={handleClose}
            />
          </Box>
          {!alert && creatorId && getUserLobbyCountFull() && (
            <CustomButton
              onClick={handleStartInterview}
              classField={classes.startInterviewButton}
              text='Start'
              color='primary'
            />
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
