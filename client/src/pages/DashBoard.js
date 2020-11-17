import React, { useContext } from 'react';

import { useStyles } from '../themes/theme';
import { StartDashboardButton } from '../components/Buttons';
import PastInterviewTable from '../components/PastInterviewTable';
import { store } from '../context/store';
import { Redirect, useHistory } from 'react-router';

const DashBoard = () => {
  const classes = useStyles();
  const { state } = useContext(store);
  const history = useHistory();
  if (!state.isAuthenticated) return <Redirect to='/signup' />;

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
