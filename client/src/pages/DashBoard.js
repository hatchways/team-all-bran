import React from 'react';
import { useContext } from 'react';

import { store } from '../context/store';

const DashBoard = (props) => {
  const { state, dispatch } = useContext(store);
  console.log(state, dispatch);
  return <div>Here in dashboard</div>;
};

export default DashBoard;
