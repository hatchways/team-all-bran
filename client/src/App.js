import React, { useContext } from 'react';
import { MuiThemeProvider } from '@material-ui/core';
import { BrowserRouter, Route } from 'react-router-dom';
import { theme } from './themes/theme';
import './App.css';
import DashBoard from './pages/DashBoard';

import Navbar from './Components/Navbar';
import Blog from './pages/Blog';
import Faq from './pages/Faq';
import Profile from './pages/Profile';

const url = `http://localhost:3001`;

function App() {
  const { dispatch } = useContext(store);

  const loadUser = async () => {
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
  };

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
    setAuthToken(localStorage.token);
    loadUser();
  }, []);

  return (
    <MuiThemeProvider theme={theme}>
      <BrowserRouter>
        <Navbar />
        <Route exact path='/dashboard' component={DashBoard} />
        <Route exact path='/profile' component={Profile} />
        <Route exact path='/blog' component={Blog} />
        <Route exact path='/faq' component={Faq} />
      </BrowserRouter>
    </MuiThemeProvider>
  );
}

export default App;
