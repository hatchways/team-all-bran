import React, { useCallback, useContext, useEffect } from 'react';
import { MuiThemeProvider } from '@material-ui/core';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import './App.css';
import DashBoard from './pages/DashBoard';
import api from './utils/api';
import Navbar from './components/Navbar';
import Blog from './pages/Blog';
import Faq from './pages/Faq';
import Profile from './pages/Profile';
import { StateProvider, store } from './context/store';
import { AUTH_ERROR, USER_LOADED } from './context/types';
import { theme } from './themes/theme';
import Signup from './pages/Signup';
import Login from './pages/Login';
import PrivateRoute from './routing/PrivateRoute';

function App() {
  const { dispatch } = useContext(store);
  const loadUser = useCallback(async () => {
    try {
      const res = await api.get('/users/auth');

      dispatch({
        type: USER_LOADED,
        payload: res.data,
      });
    } catch (err) {
      dispatch({
        type: AUTH_ERROR,
      });
    }
  }, [dispatch]);

  const setAuthToken = (token) => {
    if (token) {
      api.defaults.headers.common['Bearer'] = token;
      localStorage.setItem('token', token);
    } else {
      delete api.defaults.headers.common['Bearer'];
      localStorage.removeItem('token');
    }
  };

  useEffect(() => {
    if (localStorage.token) {
      setAuthToken(localStorage.token);
      loadUser();
    }
  }, [loadUser]);

  return (
    <Router>
      <MuiThemeProvider theme={theme}>
        <Switch>
          <Route exact path='/login' component={Login} />
          <Route exact path='/signup' component={Signup} />
          <Switch>
            <StateProvider value={store}>
              <Navbar />
              <PrivateRoute exact path='/profile' component={Profile} />
              <PrivateRoute exact path='/dashboard' component={DashBoard} />
              <PrivateRoute exact path='/blog' component={Blog} />
              <PrivateRoute exact path='/faq' component={Faq} />
            </StateProvider>
          </Switch>
          <PrivateRoute path='/' component={Signup} />
        </Switch>
      </MuiThemeProvider>
    </Router>
  );
}

export default App;
