import React, { useState, useEffect, useContext } from 'react';
import { Redirect, useHistory } from 'react-router';
import socketIOClient from 'socket.io-client';
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

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction='up' ref={ref} {...props} />;
});

const Lobby = () => {
  const ENDPOINT = '/';
  const URL = `http://localhost:3000`;


  const handleClose = () => {
    setOpen(false);
  };

  const [open, setOpen] = useState(true);
  const [userData, setUserData] = useState(null);
  const history = useHistory();

  const { state } = useContext(store);

  useEffect(() => {
    const roomId = history.location.pathname.split('/')[2];
    const socket = socketIOClient(ENDPOINT);
    socket.emit('join_room', { user: state.user, roomId });
    socket.on('users', (users) => {
      if (users === null) {
        alert("TOO MANY PEOPLE!!!!")
        history.push('/dashboard');
        return;
      }
      setUserData(Object.values(users));
    });
    return () => socket.disconnect();
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
          <WaitingRoomUserList userData={userData} handleClose={handleClose} />
        </div>
      </Dialog>
    </div>
  );
};

export default Lobby;
