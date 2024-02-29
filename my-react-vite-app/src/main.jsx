import ReactDOM from 'react-dom';
import React from 'react';
import App from './components/app.jsx';
import { BrowserRouter } from 'react-router-dom';
import { createTheme, ThemeProvider } from '@mui/material/styles';

import { Provider } from 'react-redux';

// import store created in the app /
import store from './app/store';
const theme = createTheme({});

// eslint-disable-next-line react/no-deprecated
ReactDOM.render(
  // wrap to mak ethe store availble to evrry comp in the app
  <Provider store={store}>
    <ThemeProvider theme={theme}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </ThemeProvider>
  </Provider>,

  document.getElementById('root')
);
