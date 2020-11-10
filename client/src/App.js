import React from "react";
import { MuiThemeProvider } from "@material-ui/core";
import { BrowserRouter, Route } from "react-router-dom";

import { theme } from "./themes/theme";
import Signup from './pages/Signup'
import Login from './pages/Login'

import "./App.css";

function App() {
  return (
    <MuiThemeProvider theme={theme}>
      <BrowserRouter>
        <Route exact path="/" component={Signup} />
        <Route exact path="/Login" component={Login} />
      </BrowserRouter>
    </MuiThemeProvider>
  );
}

export default App;
