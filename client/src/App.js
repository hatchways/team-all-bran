import React from 'react';
import { MuiThemeProvider } from '@material-ui/core';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import './App.css';
import { StateProvider, store } from './context/store';
import { theme } from './themes/theme';
import Signup from './pages/Signup';
import Login from './pages/Login';
import UserInformation from './components/UserInformation';

import Routes from './routing/Routes';

function App() {
  return (
    <StateProvider value={store}>
      <MuiThemeProvider theme={theme}>
        <Router>
          <Switch>
            <Route exact path='/login' component={Login} />
            <Route exact path='/signup' component={Signup} />
            <Route exact path='/test' component={UserInformation} />
            <Route component={Routes} />
          </Switch>
        </Router>
      </MuiThemeProvider>
    </StateProvider>
  );
}

export default App;
