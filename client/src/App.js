import React, { useCallback, useContext, useEffect } from 'react';
import { MuiThemeProvider } from '@material-ui/core';
import { BrowserRouter, Route } from 'react-router-dom';
import { theme } from './themes/theme';
import './App.css';
import DashBoard from './pages/DashBoard';
import api from './utils/api';
import Navbar from './Components/Navbar';
import Blog from './pages/Blog';
import Faq from './pages/Faq';
import Profile from './pages/Profile';
import { StateProvider, store } from './context/store';
import { AUTH_ERROR, USER_LOADED } from './context/types';

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
    <StateProvider value={store}>
      <MuiThemeProvider theme={theme}>
        <BrowserRouter>
          <Navbar />
          <Route exact path='/dashboard' component={DashBoard} />
          <Route exact path='/profile' component={Profile} />
          <Route exact path='/blog' component={Blog} />
          <Route exact path='/faq' component={Faq} />
        </BrowserRouter>
      </MuiThemeProvider>
    </StateProvider>
  );
}

export default App;
