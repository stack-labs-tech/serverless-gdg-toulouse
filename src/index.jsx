import 'babel-polyfill';

import React from 'react';
import ReactDom from 'react-dom';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import red from '@material-ui/core/colors/red';

import Header from './components/Header/Header.component';
import Dashboard from './components/Dashboard/Dashboard.component';

const theme = createMuiTheme({
  typography: {
    useNextVariants: true,
    body1: {
      color: '#848484',
    },
    // h6: {
    //   color: '#848484',
    // },
  },
  palette: {
    primary: {
      main: '#ffffff',
    },
    secondary: {
      main: '#848484',
    },
    error: red,
    contrastThreshold: 3,
    tonalOffset: 0.2,
  },
});

ReactDom.render(
  <MuiThemeProvider theme={theme}>
    <React.Fragment>
      <CssBaseline />
      <Header />
      <Dashboard />
    </React.Fragment>
  </MuiThemeProvider>, document.getElementById('root'),
);
