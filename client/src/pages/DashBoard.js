import React from 'react';
import { useContext } from 'react';
import { useStyles } from '../themes/theme';

import { store } from '../context/store';

const DashBoard = (props) => {
  const { state } = useContext(store);
<<<<<<< HEAD

  return <div>Hello from dashboard {state.user.email}</div>;
=======
  const classes = useStyles()

  return (
    <div className={classes.dashboardContainer}>
      <div>Top</div>
      <div>Middle</div>
      <div>Bottom</div>
    </div>
  );
>>>>>>> Justify content to center from top to bottom
};

export default DashBoard;
