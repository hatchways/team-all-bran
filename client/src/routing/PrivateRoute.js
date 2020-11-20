import React, { useContext, useCallback, useEffect, useState } from 'react';
import { Redirect, Route } from 'react-router';
import { store } from '../context/store';
import axios from 'axios';
import { USER_LOADED } from '../context/types'
const PrivateRoute = ({ component: Component, ...rest }) => {

  const { dispatch, state } = useContext(store);
  const [isBusy, setBusy] = useState(true);

  const getUserInfo = useCallback(async () => {

    try {
      const result = await axios.get('http://localhost:3000/users/')
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
    state: { isAuthenticated },
  } = useContext(store);
  if (isBusy) {
    return null
  }
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
