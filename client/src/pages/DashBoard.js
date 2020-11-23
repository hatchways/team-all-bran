import React, { useContext } from 'react';

import { useStyles } from '../themes/theme';
import { StartDashboardButton } from '../components/Buttons';
import PastInterviewTable from '../components/PastInterviewTable';
import { store } from '../context/store';
import { useHistory } from 'react-router';

import UserInformation from '../components/UserInformation';

const DashBoard = () => {
  const classes = useStyles();

  const { state } = useContext(store);

  if (state.user.experience === undefined) {
    return <UserInformation user={state.user} />;
  }

  return (
    !state.loading && (
      <div className={classes.dashboardContainer}>
        <StartDashboardButton onClick={() => history.push('/lobby')}>
          START
        </StartDashboardButton>
        <p className={classes.pastPracticesText}>Past Practice Interviews</p>
        <PastInterviewTable />
      </div>
    )
  );
};

export default DashBoard;
