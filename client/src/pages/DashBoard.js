import React, { useContext } from 'react';
import InterviewDialog from '../components/InterviewDialog';
import { useStyles } from '../themes/theme';
import PastInterviewTable from '../components/PastInterviewTable';
import { store } from '../context/store';
import { Redirect } from 'react-router';

import UserInformation from '../components/UserInformation';

const DashBoard = () => {
  const classes = useStyles();

  const { state } = useContext(store);

  if (!state.isAuthenticated) return <Redirect to='/signup' />;

  if (state.user.experience === undefined) {
    return <UserInformation user={state.user} />;
  }

  return (
    !state.loading && (
      <div className={classes.dashboardContainer}>
        <InterviewDialog />
        <p className={classes.pastPracticesText}>Past Practice Interviews</p>
        <PastInterviewTable />
      </div>
    )
  );
};

export default DashBoard;
