import React from 'react';
import { useContext } from 'react';
import { useStyles } from '../themes/theme';
import { StartDashboardButton } from '../components/Buttons'
import PastInterviewTable from '../components/PastInterviewTable'

import { store } from '../context/store';

const DashBoard = (props) => {
  const { state } = useContext(store);
  const classes = useStyles()

  return (
    <div className={classes.dashboardContainer}>
      <StartDashboardButton>START</StartDashboardButton>
      <p className={classes.pastPracticesText}>Past Practice Interviews</p>
      <PastInterviewTable />
    </div>
  );
};

export default DashBoard;
