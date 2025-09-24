// frontend/src/index.js
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { setAuthToken } from './services/api';

// restore token BEFORE rendering app
const token = localStorage.getItem('token');
if (token) setAuthToken(token);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
