import React, { useContext } from 'react';

import { useStyles } from '../themes/theme';
import DialogTitle from '@material-ui/core/DialogTitle';
import Dialog from '@material-ui/core/Dialog';

import { StartDashboardButton } from './Buttons';
import InterviewDifficultyMenu from './InterviewDifficultyMenu';
import Axios from 'axios';
import { store } from '../context/store';
import { useHistory } from 'react-router';
import Lobby from '../pages/Lobby';

function SimpleDialog({ onClose, selectedValue, open, handleChange }) {
  const classes = useStyles();

  const handleClose = () => {
    onClose(selectedValue);
  };

  const { state } = useContext(store);
  const history = useHistory();

  const createInterview = async () => {
    try {
      const { data } = await Axios.post(
        '/interviews',
        { creator: state.user._id },
        { withCredentials: true }
      );
      history.push({
        pathname: `/lobby/${data.interview._id}`,
        state: { difficulty: selectedValue }
      })
    } catch (err) {
      console.error('OUTPUT: SimpleDialog -> err', err);
    }
  };

  return (
    <Dialog onClose={handleClose} aria-labelledby='simple-dialog-title' open={open}>
      <div className={classes.createInterviewDialog}>
        <DialogTitle id='simple-dialog-title' className={classes.pastPracticesText}>
          Create
        </DialogTitle>
        <InterviewDifficultyMenu
          selectedValue={selectedValue}
          handleChange={handleChange}
        />
        <StartDashboardButton onClick={createInterview}>Create</StartDashboardButton>
      </div>
    </Dialog>
  );
}

export default function SimpleDialogDemo() {
  const [open, setOpen] = React.useState(false);
  const [selectedValue, setSelectedValue] = React.useState('Medium');

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

  return (
    <div>
      <StartDashboardButton
        variant='outlined'
        color='primary'
        onClick={handleClickOpen}
      >
        START
      </StartDashboardButton>
      <SimpleDialog
        handleChange={handleChange}
        fullWidth='true'
        maxWidth='sm'
        selectedValue={selectedValue}
        open={open}
        onClose={handleClose}
      />
    </div>
  );
}
