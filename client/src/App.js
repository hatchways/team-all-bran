import React from 'react';

import { MuiThemeProvider } from '@material-ui/core';
import { BrowserRouter, Route } from 'react-router-dom';

import { theme } from './themes/theme';
import LandingPage from './pages/Landing';

import './App.css';
import DashBoard from './pages/DashBoard';

import { StateProvider, store } from './context/store';
import Navbar from './Components/Navbar';
import Blog from './pages/Blog';
import Faq from './pages/Faq';

function App() {
  return (
    <StateProvider value={store}>
      <MuiThemeProvider theme={theme}>
        <BrowserRouter>
          <Navbar />
          <Route exact path='/' component={LandingPage} />
          <Route exact path='/dashboard' component={DashBoard} />
          <Route exact path='/blog' component={Blog} />
          <Route exact path='/faq' component={Faq} />
        </BrowserRouter>
      </MuiThemeProvider>
    </StateProvider>
  );
}

export default App;
