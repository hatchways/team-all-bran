import React, { useContext } from 'react';
import { useStyles } from '../themes/theme';
import DialogTitle from '@material-ui/core/DialogTitle';
import Dialog from '@material-ui/core/Dialog';
import { StartDashboardButton } from './Buttons';
import InterviewDifficultyMenu from './InterviewDifficultyMenu';
import { store } from '../context/store';
import { useHistory } from 'react-router';
import { createInterview } from '../utils/apiFunctions';

function SimpleDialog({ onClose, selectedValue, open, handleChange }) {
  const classes = useStyles();

  const handleClose = () => {
    onClose(selectedValue);
  };

  const { state } = useContext(store);
  const history = useHistory();

  const createInt = async () => {
    try {
      const { data } = await createInterview(state.user._id);

      history.push(`/lobby/${data.interview._id}`);
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
        <StartDashboardButton onClick={createInt}>Create</StartDashboardButton>
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
