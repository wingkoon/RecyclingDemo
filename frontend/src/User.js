import React, { useContext, useState } from 'react';
import { Link, useNavigate  } from 'react-router-dom'; // For navigation
import { LoginContext } from './LoginContext'; 

const User = () => {
  const { isLoggedIn, userEmail } = useContext(LoginContext);

  if (!isLoggedIn) {
    return (
      <div className="login-container">
        <h1>Please Login First</h1>
        <Link to="/user/login">Login</Link>
      </div>
    );
  }

  return (
    <div className="user-dashboard">
      <header className="header">
        <div className="profile">
          <p>Welcome, {userEmail}</p>
          <Link to="/user/profile">View Profile</Link>
        </div>
        <nav>
          <ul>
            <li>
              <Link to="/user/waste">Post Waste</Link>
            </li>
            <li>
              <Link to="/user/results">Matchmaking Results</Link>
            </li>
          </ul>
          </nav>
        <Link to="/logout">Logout</Link>
      </header>
    </div>
  );
};

export default User;
