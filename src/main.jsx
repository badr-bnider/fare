import React from 'react'
import ReactDOM from 'react-dom'
import './assets/styles/index.css'
import Files from './components/Files/Files'
import Authentication from './components/Authentication/Authentication'

import { ThemeProvider, createTheme } from '@material-ui/core/styles';
import { grey } from '@material-ui/core/colors';

const theme = createTheme({
  palette: {
    primary: {
      main: "#F65137",
    },
    secondary: {
      main: grey[800]
    }
  },
  typography: {
    fontFamily: "Montserrat",
    fontWeight: 800
  },
})

import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";

ReactDOM.render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <Router>
        <Switch>
          <Route path="/auth">
            <Authentication />
          </Route>
          <Route path="/">
            <Files/>
          </Route>
        </Switch>
      </Router>
    </ThemeProvider>
  </React.StrictMode>,
  document.getElementById('root')
)
