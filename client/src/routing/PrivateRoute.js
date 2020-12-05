import React, { useContext, useCallback, useEffect, useState } from 'react';
import { Redirect, Route } from 'react-router';
import { store } from '../context/store';
import { USER_LOADED } from '../context/types';
import { getUser } from '../utils/apiFunctions';
import Dashboard from '../pages/DashBoard';

const PrivateRoute = ({ component: Component, ...rest }) => {
  const { dispatch } = useContext(store);
  const [isBusy, setBusy] = useState(true);

  const getUserInfo = useCallback(async () => {
    try {
      const result = await getUser();
      dispatch({
        type: USER_LOADED,
        payload: result.data.user,
      });
      setBusy(false);
    } catch (error) {
      setBusy(false);
    }
  }, [dispatch]);

  useEffect(() => {
    setBusy(true);
    getUserInfo();
  }, [getUserInfo]);

  const {
    state: { isAuthenticated, user },
  } = useContext(store);
  if (isBusy) {
    return null;
  }
  return (
    <Route
      {...rest}
      render={(props) =>
        !isAuthenticated ? (
          <Redirect to='/signup' />
        ) : user.experience !== undefined ? (
          <Component {...props} />
        ) : (
          <Dashboard />
        )
      }
    />
  );
};

export default PrivateRoute;
