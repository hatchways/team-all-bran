import React from 'react';
import { useContext } from 'react';

import { store } from '../context/store';

const DashBoard = (props) => {
  const { state } = useContext(store);
  return <div>Hello from dashboard {state.user.email}</div>;
};

export default DashBoard;
