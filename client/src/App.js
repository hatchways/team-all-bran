import React from 'react';

import { MuiThemeProvider } from '@material-ui/core';
import { BrowserRouter, Route } from 'react-router-dom';

import { theme } from './themes/theme';
import LandingPage from './pages/Landing';

import './App.css';
import DashBoard from './pages/DashBoard';

import { StateProvider, store } from './context/store';

function App() {
  return (
    <StateProvider value={store}>
      <MuiThemeProvider theme={theme}>
        <BrowserRouter>
          <Route exact path='/' component={LandingPage} />
          <Route path='/dashboard' component={DashBoard} />
        </BrowserRouter>
      </MuiThemeProvider>
    </StateProvider>
  );
}

export default App;
