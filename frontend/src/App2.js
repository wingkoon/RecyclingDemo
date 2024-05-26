import React, { useState } from 'react';
import HomePage from './HomePage';
import User from './User';

function App() {
  const [isUserLoggedIn, setUserLoggedIn] = useState(false);
  const [isProviderLoggedIn, setProviderLoggedIn] = useState(false);

  const handleUserLogin = () => setUserLoggedIn(true);
  const handleProviderLogin = () => setProviderLoggedIn(true);
  
  const handleUserLogout = () => setUserLoggedIn(false);
  const handleProviderLogout = () => setProviderLoggedIn(false);

  return (
    <div>
      {!isUserLoggedIn && !isProviderLoggedIn && (
        <HomePage onUserLogin={handleUserLogin} onProviderLogin={handleProviderLogin} />
      )}
      {isUserLoggedIn && <User onLogout={handleUserLogout} />}
      {isProviderLoggedIn && <Provider onLogout={handleProviderLogout} />}
    </div>
  );
}