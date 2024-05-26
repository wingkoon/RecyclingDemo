import React, { useContext, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { LoginContext } from './LoginContext'; 

function Provider() {
  const navigate = useNavigate();
  const { isLoggedIn, userEmail } = useContext(LoginContext);

  if (!isLoggedIn) {
    return (
      <div className="login-container">
        <h1>Please Login First</h1>
        <Link to="/provider/login">Login</Link>
      </div>
    );
  }
  

  const handleLogout = () => {
    localStorage.removeItem('providerEmail');
    navigate('/'); // Redirect to home page on logout
  };

  return (
    <div className="provider-board">
      {userEmail ? (
        <>
          <h1>Recycling Service Provider Board</h1>
          <nav>
            <ul>
            <p>Welcome, {userEmail}</p>
              <li>
                <Link to="/provider/profile">Profile</Link>
              </li>
              <li>
                <Link to="/provider/service">Service Offer</Link>
              </li>
              <li>
                <Link to="/provider/result">Matchmaking Results</Link>
              </li>
              <li>
              <Link to="/provider/logout">Logout</Link>
              </li>
            </ul>
          </nav>
          {/* Your other provider board content here */}
        </>
      ) : (
        <p>
          Please login first. <Link to="/login">Login</Link>
        </p>
      )}
    </div>
  );
}

export default Provider;

