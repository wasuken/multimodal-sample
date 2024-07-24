import React from 'react';
import ReactDOM from 'react-dom';
import { CssBaseline } from '@mui/material';
// import PageA from './pages/PageA';
import PageB from './pages/PageB';

ReactDOM.render(
  <React.StrictMode>
    <CssBaseline />
    <PageB />
  </React.StrictMode>,
  document.getElementById('root')
);
