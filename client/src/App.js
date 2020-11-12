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
      <Switch>
        <StateProvider value={store}>
          <MuiThemeProvider theme={theme}>
            <Navbar />
            <Route exact path='/login' component={Login} />
            <Route exact path='/signup' component={Signup} />
            <Route exact path='/profile' component={Profile} />
            <Route exact path='/dashboard' component={DashBoard} />
            <Route exact path='/blog' component={Blog} />
            <Route exact path='/faq' component={Faq} />
            <Redirect from='/' to='/signup' />
          </MuiThemeProvider>
        </StateProvider>
      </Switch>
    </Router>
  );
}

export default App;
