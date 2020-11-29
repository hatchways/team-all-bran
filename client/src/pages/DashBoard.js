import React, { useContext, useEffect } from 'react';

import { useStyles } from '../themes/theme';
import PastInterviewTable from '../components/PastInterviewTable';
import { store } from '../context/store';

import { useHistory } from 'react-router';
import InterviewDifficultyMenu from './InterviewDifficultyMenu';

import UserInformation from '../components/UserInformation';
import { createInterview } from '../utils/apiFunctions';
import { CustomButton } from '../components/Buttons';
import { Dialog, DialogTitle } from '@material-ui/core';
import SocketContext from '../context/socket';

const DashBoard = () => {
  const classes = useStyles();
  const history = useHistory();
  const [open, setOpen] = React.useState(false);
  const [selectedValue, setSelectedValue] = React.useState('Medium');
  const { state } = useContext(store);
  const socket = useContext(SocketContext);

  useEffect(() => {
    socket.emit('logged_in', state.user._id);
  }, [state.user, socket]);

  useEffect(() => {
    socket.emit('check_rooms', { userId: state.user._id });
  }, [socket, state.user]);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = (value) => {
    setOpen(false);
    setSelectedValue(value);
  };
  const handleChange = (event) => {
    setSelectedValue(event.target.value);
  };

  const createInt = async () => {
    try {
      const { data } = await createInterview({ difficulty: selectedValue });
      history.push({
        pathname: `/lobby/${data.interview._id}`
      })
    } catch (err) {
      console.error('OUTPUT: SimpleDialog -> err', err);
    }
  };

  if (state.user.experience === undefined) {
    return <UserInformation user={state.user} />;
  }

  return (
    !state.loading && (
      <div className={classes.dashboardContainer}>
        <CustomButton onClick={handleClickOpen} text='START' classField={classes.startDashboardButton} />
        <Dialog
          onClose={handleClose}
          aria-labelledby='simple-dialog-title'
          open={open}
        >
          <div className={classes.createInterviewDialog}>
            <DialogTitle
              id='simple-dialog-title'
              className={classes.pastPracticesText}
            >
              Create
            </DialogTitle>
            <InterviewDifficultyMenu
              selectedValue={selectedValue}
              handleChange={handleChange}
            />
            <CustomButton onClick={createInt} classField={classes.startDashboardButton} text='CREATE' />
          </div>
        </Dialog>
        <p className={classes.pastPracticesText}>Past Practice Interviews</p>
        <PastInterviewTable />
      </div>
    )
  );
};

export default DashBoard;
