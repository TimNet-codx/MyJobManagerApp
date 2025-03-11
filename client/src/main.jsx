import React from 'react';
import ReactDom from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import axios from 'axios';
import  customFetch from './utils/customFetch.js'
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';


// fetch('http://localhost:5200/api/v1/test')
//   .then((res) => res.json())
//   .then((data) => console.log(data));

// fetch('/api/v1/test')
//   .then((res) => res.json())
//   .then((data) => console.log(data));

  // const data = await axios.get('/api/v1/test');
  // console.log(data);

// const data = await customFetch.get('/test');
// console.log(data);


ReactDom.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
    <ToastContainer position='top-center' />
  </React.StrictMode>,
)
