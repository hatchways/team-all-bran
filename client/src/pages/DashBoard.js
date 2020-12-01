import React, { useContext, useEffect, useState } from 'react';
import { useStyles } from '../themes/theme';
import PastInterviewTable from '../components/PastInterviewTable';
import UpcomingInterviewTable from '../components/UpcomingInterviewTable';
import { store } from '../context/store';
import { useHistory } from 'react-router';
import InterviewDifficultyMenu from './InterviewDifficultyMenu';
import UserInformation from '../components/UserInformation';
import { createInterview } from '../utils/apiFunctions';
import { CustomButton } from '../components/Buttons';
import { Dialog, DialogTitle } from '@material-ui/core';
import { fetchInterviews } from '../utils/fetchInterviews';

const DashBoard = () => {
  const classes = useStyles();
  const history = useHistory();
  const [open, setOpen] = useState(false);
  const [selectedValue, setSelectedValue] = useState('Medium');
  const { state } = useContext(store);
  const [pageData, setPageData] = useState({
    pageLoaded: false,
    interviews: null,
  });

  const getInterviews = async () => {
    const interviews = await fetchInterviews(state.user._id);

    setPageData({
      pageLoaded: true,
      interviews: interviews,
    });
  };

  useEffect(() => {
    getInterviews();
  }, []);

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
        pathname: `/lobby/${data.interview._id}`,
      });
    } catch (err) {
      console.error('OUTPUT: SimpleDialog -> err', err);
    }
  };

  if (state.user.experience === undefined) {
    return <UserInformation user={state.user} />;
  }

  return (
    !state.loading &&
    pageData.pageLoaded && (
      <div className={classes.dashboardContainer}>
        <CustomButton
          onClick={handleClickOpen}
          text='START'
          classField={classes.startDashboardButton}
        />
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
            <CustomButton
              onClick={createInt}
              classField={classes.startDashboardButton}
              text='CREATE'
            />
          </div>
        </Dialog>
        <p className={classes.pastPracticesText}>Upcoming Practice Interviews</p>
        <UpcomingInterviewTable interviews={pageData.interviews} />
        <p className={classes.pastPracticesText}>Past Practice Interviews</p>
        <PastInterviewTable interviews={pageData.interviews} />
      </div>
    )
  );
};

export default DashBoard;
