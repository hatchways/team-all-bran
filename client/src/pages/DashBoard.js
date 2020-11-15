import React, { useContext } from 'react';

import { useStyles } from '../themes/theme';
import { StartDashboardButton } from '../components/Buttons';
import PastInterviewTable from '../components/PastInterviewTable';
import NavBar from '../components/Navbar'
import { store } from '../context/store';
import { Redirect } from 'react-router';

const DashBoard = () => {
  const classes = useStyles();
  const { state } = useContext(store);
  if (!state.isAuthenticated) return <Redirect to='/signup' />;

  return (
    !state.loading &&
    <div className={classes.dashboardContainer}>
      <NavBar />
      <StartDashboardButton>START</StartDashboardButton>
      <p className={classes.pastPracticesText}>Past Practice Interviews</p>
      <PastInterviewTable />
    </div>
  );
};

export default DashBoard;
