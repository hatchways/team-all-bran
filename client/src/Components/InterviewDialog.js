import React from 'react';

import { useStyles } from '../themes/theme';
import DialogTitle from '@material-ui/core/DialogTitle';
import Dialog from '@material-ui/core/Dialog';

import { StartDashboardButton } from './Buttons';
import InterviewDifficultyMenu from './InterviewDifficultyMenu';

function SimpleDialog({ onClose, selectedValue, open, handleChange }) {
  const classes = useStyles();

  const handleClose = () => {
    onClose(selectedValue);
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
        <StartDashboardButton>Create</StartDashboardButton>
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
    console.log(event.target.value);
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
