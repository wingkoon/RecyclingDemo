// LoginContext.js
import React, { createContext, useState } from 'react';

const LoginContext = createContext();

const LoginProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false); // Initial login state (adjust if needed)
  const [userType, setUserType] = useState('user'); // Initial user type (user/provider)
  const [userEmail, setUserEmail] = useState(''); // Add userEmail state
  const [userProfile, setUserProfile] = useState(''); 


  return (
    <LoginContext.Provider value={{ isLoggedIn, setIsLoggedIn, userType, setUserType, userEmail, setUserEmail, userProfile, setUserProfile }}>
      {children}
    </LoginContext.Provider>
  );
};

export { LoginContext, LoginProvider };
