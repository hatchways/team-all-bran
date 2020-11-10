import React from 'react';
import { useContext } from 'react';
import { store } from '../context/store';

const DashBoard = (props) => {
  console.log(useContext(store));
  return <div>Here in the dashboard</div>;
};

export default DashBoard;
