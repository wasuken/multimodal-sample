import React from 'react';
import ReactDOM from 'react-dom';
import { CssBaseline } from '@mui/material';
import PageA from './pages/PageA';

ReactDOM.render(
  <React.StrictMode>
    <CssBaseline />
    <PageA />
  </React.StrictMode>,
  document.getElementById('root')
);
