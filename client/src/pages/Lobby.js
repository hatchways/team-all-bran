import React, { useState, useEffect, useContext } from 'react';
import { Redirect, useHistory } from 'react-router';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Slide from '@material-ui/core/Slide';
import { ContinueButton } from '../components/Buttons';
import { Input, InputLabel } from '@material-ui/core';
import { store } from '../context/store';
import WaitingRoomUserList from '../components/WaitingRoomUserList'
import Snackbar from '@material-ui/core/Snackbar';
import SnackbarContent from '@material-ui/core/SnackbarContent';

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction='up' ref={ref} {...props} />;
});

const Lobby = () => {
  const URL = `http://localhost:3000`;


  const handleClose = () => {
    setOpen(false);
  };

  const [open, setOpen] = useState(true);
  const [userData, setUserData] = useState(null);
  const [creatorId, setCreatorId] = useState(null)
  const [localState, setLocalState] = useState({
    alert: false,
    vertical: 'bottom',
    horizontal: 'center',
    message: null,
  });

  const history = useHistory();
  const roomId = history.location.pathname.split('/')[2];
  const { state } = useContext(store);
  const socket = state.socket

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
  }

  useEffect(() => {
    let mounted = true;

    socket.emit('join_room', { user: state.user, roomId });
    socket.on('users', (users) => {
      if (users === null) {
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
    socket.on('join_interview_room', (users) => {
      history.push('/interview');
    });

    return () => {
      mounted = false;
      socket.emit('waiting_room_disconnect');
    };
  }, []);

  if (!open) return <Redirect to='/dashboard' />;

  return (
    <div>
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
            <Input onChange={() => { }} value={URL + history.location.pathname}>
              <InputLabel>Copy Link</InputLabel>
            </Input>
            <ContinueButton onClick={handleClose} color='primary'>
              COPY
            </ContinueButton>
          </DialogActions>
          <DialogContent>
            <DialogContentText id='alert-dialog-slide-description'></DialogContentText>
          </DialogContent>
          <WaitingRoomUserList showStartButton={!alert} userData={userData} handleClose={handleClose} />
          {!alert &&
            creatorId &&
            <ContinueButton onClick={handleStartInterview} color='primary'>
              Start
        </ContinueButton>}
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
    </div>
  );
};

export default Lobby;
