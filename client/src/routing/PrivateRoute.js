import React, { useContext } from 'react';
import { Redirect, Route } from 'react-router';
import { store } from '../context/store';

const PrivateRoute = ({ component: Component, ...rest }) => {
  const {
    state: { loading, isAuthenticated },
  } = useContext(store);
  return (
    <Route
      {...rest}
      render={(props) =>
        isAuthenticated ? <Component {...props} /> : <Redirect to='/signup' />
      }
    />
  );
};

export default PrivateRoute;
