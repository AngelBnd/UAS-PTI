import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import reportWebVitals from './reportWebVitals';

// UNUSED, TRANSFERED TO APP JSX FOR SIMPLER IMPORT

// import './index.css';
// import {MainGameLayout, Menu} from './App';
// import  {createBrowserRouter, RouterProvider} from "react-router-dom";

// const router = createBrowserRouter([
//   {path : "/", element : <MainGameLayout/>},
//   {path : "/", element : <Menu/>},
// ]);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
