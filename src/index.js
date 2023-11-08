import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import reportWebVitals from './reportWebVitals';
import '@mantine/core/styles.css';
import { MantineProvider, createTheme, rem } from '@mantine/core';
import './index.css';
import './interceptors/axios';

const root = ReactDOM.createRoot(document.getElementById('root'));
const theme = createTheme({
  primaryColor: 'yellow',
  fontFamily: 'Abel, sans-serif',
  headings: {
    fontFamily: 'Abel, sans-serif',
    sizes: {
      h1: { fontSize: rem(100) }
    }
  },
})

root.render(
  <MantineProvider theme={theme} defaultColorScheme="dark">
    <App />
  </MantineProvider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
