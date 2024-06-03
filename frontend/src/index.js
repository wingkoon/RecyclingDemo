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
import ProviderLogin from './ProviderLogin';
import ProviderProfile from './ProviderProfile';
import Provider from './Provider';
import ProviderMatchedResult from './ProviderMatchedResult';
import Logout from './Logout';
import MatchmakingResults from './MatchMakingResults';
import ServiceOfferPage from './ProviderService';
import { LoginContext, LoginProvider } from './LoginContext'; 

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <LoginProvider>
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<App />} /> {/* Home route */}
      <Route path="/user/login" element={<Login />} /> {/* Login route */}
      <Route path="/user/profile" element={<Profile />} /> 
      <Route path="/user" element={<User />} />
      <Route path="/user/waste" element={<Waste />} />
      <Route path="/user/result" element={<MatchmakingResults />} />
      <Route path="/provider/login" element={<ProviderLogin />} />
      <Route path="/provider/profile" element={<ProviderProfile />} />
      <Route path="/provider/service" element={<ServiceOfferPage />} />
      <Route path="/provider" element={<Provider />} />
      <Route path="/provider/result" element={<ProviderMatchedResult />} />
      <Route path="/logout" element={<Logout />} />
    </Routes>
  </BrowserRouter>
  </LoginProvider>
);

reportWebVitals();











