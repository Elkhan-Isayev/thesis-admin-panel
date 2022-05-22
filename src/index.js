import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App/App';
import axios from 'axios';

axios.interceptors.request.use(request => {
  console.log(request);
  return request;
});

axios.interceptors.response.use(response => {
  console.log(response);
  return response;
});

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
