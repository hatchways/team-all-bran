import React, { useCallback, useContext, useEffect } from 'react';
import { MuiThemeProvider } from '@material-ui/core';
import {
  BrowserRouter as Router,
  Redirect,
  Route,
  Switch,
} from 'react-router-dom';
import './App.css';
import DashBoard from './pages/DashBoard';

import Blog from './pages/Blog';
import Faq from './pages/Faq';
import Profile from './pages/Profile';
import { StateProvider, store } from './context/store';
import { AUTH_ERROR, USER_LOADED } from './context/types';
import { theme } from './themes/theme';
import Signup from './pages/Signup';
import Login from './pages/Login';
import PrivateRoute from './routing/PrivateRoute';

import Routes from './routing/Routes';

function App() {
  const { state, dispatch } = useContext(store);
  const loadUser = useCallback(async () => {
    var myHeaders = new Headers();

    await fetch('http://localhost:3001/users/', {
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      // credentials: 'same-origin',
    })
      .then((response) => response.json())
      .then(({ user }) =>
        dispatch({
          type: USER_LOADED,
          payload: user,
        })
      )
      .catch((error) => console.log('error', error));
  }, [dispatch]);

  useEffect(() => {
    loadUser();
  }, [loadUser]);

  return (
    <StateProvider value={store}>
      <MuiThemeProvider theme={theme}>
        <Router>
          <Switch>
            <Route exact path='/' component={Signup} />
            <Route exact path='/login' component={Login} />
            <Route exact path='/signup' component={Signup} />
            <Route component={Routes} />
          </Switch>
        </Router>
      </MuiThemeProvider>
    </StateProvider>
  );
}

export default App;
