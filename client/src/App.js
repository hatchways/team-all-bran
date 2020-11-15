import React from 'react';
import { MuiThemeProvider } from '@material-ui/core';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import './App.css';
import DashBoard from './pages/DashBoard';
import Blog from './pages/Blog';
import Faq from './pages/Faq';
import Profile from './pages/Profile';
import { StateProvider, store } from './context/store';
import { theme } from './themes/theme';
import Signup from './pages/Signup';
import Login from './pages/Login';
import PrivateRoute from './routing/PrivateRoute';

function App() {
  return (
    <Router>
      <MuiThemeProvider theme={theme}>
        <StateProvider value={store}>
          <Switch>
            <Route exact path='/login' component={Login} />
            <Route exact path='/signup' component={Signup} />
            <PrivateRoute exact path='/profile' component={Profile} />
            <PrivateRoute exact path='/dashboard' component={DashBoard} />
            <PrivateRoute exact path='/blog' component={Blog} />
            <PrivateRoute exact path='/faq' component={Faq} />
            <Route path='/' component={Signup} />
          </Switch>
        </StateProvider>
      </MuiThemeProvider>
    </Router>
  );
}

export default App;
