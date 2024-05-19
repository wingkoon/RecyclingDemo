import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter, Routes, Route } from 'react-router-dom'; // Import BrowserRouter
import Login from './Login'; // Import Login component
import Profile from './Profile';
import User from './User';
import Waste from './Waste';
import Result from './Result';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<App />} /> {/* Home route */}
      <Route path="/user/login" element={<Login />} /> {/* Login route */}
      <Route path="/user/profile" element={<Profile />} /> 
      <Route path="/user" element={<User />} />
      <Route path="/user/waste" element={<Waste />} />
      <Route path="/user/result" element={<Result />} />
    </Routes>
  </BrowserRouter>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
