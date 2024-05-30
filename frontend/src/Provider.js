import React, { useContext, useState } from 'react';
import { Link, useNavigate  } from 'react-router-dom'; // For navigation
import { LoginContext } from './LoginContext'; 
import Logout from './Logout';
import Navigation from './NavigationBar';

const Provider = () => {
  const { isLoggedIn, userEmail } = useContext(LoginContext);
  const recycleIcon = require('./recyclepro.jpg'); 
  const wasteIcon = require('./waste.png'); // Replace with your image path
  const resultsIcon = require('./handshake.png'); // Replace with your image path
  const logoutIcon = require('./bye.png'); // Replace with your image path

  if (!isLoggedIn) {
    return (
      <div className="login-container">
        <h1>Please Login First</h1>
        <Link to="/provider/login">Login</Link>
      </div>
    );
  }

  return (
    <div className="user-dashboard">
      <Navigation user={userEmail} usertype={'provider'} />
      <header className="header">
      <div className="profile text-center"> {/* Center "User Dashboard" text */}
          <h1 style={{ fontSize: '48px', marginBottom: '100px', marginTop: '120px' }}>Recycle Service Provider Dashboard</h1> {/* Adjust margin as needed */}
        </div>
        <nav className="d-flex flex-wrap justify-content-between">
          <div className="col-md-6">
            <Link to="/provider/profile" className="btn btn-primary mb-3 d-flex align-items-center justify-content-center">
              <img src={recycleIcon} alt="Post Waste" width="30" height="30" /> {/* Add image */}
              <span className="ms-2">Profile</span> {/* Button text */}
            </Link>
            <Link to="/provider/service" className="btn btn-primary mb-3 d-flex align-items-center justify-content-center">
              <img src={wasteIcon} alt="Service Offer" width="30" height="30" /> {/* Add image */}
              <span className="ms-2">Service Offer</span> {/* Button text */}
            </Link>
          </div>
          <div className="col-md-6">
            <Link to="/provider/result" className="btn btn-primary mb-3 d-flex align-items-center justify-content-center">
              <img src={resultsIcon} alt="Matchmaking Results" width="30" height="30" /> {/* Add image */}
              <span className="ms-2">Matchmaking Results</span> {/* Button text */}
              </Link>
              <Link to="/logout" className="btn btn-primary mb-3 d-flex align-items-center justify-content-center">
              <img src={logoutIcon} alt="Logout" width="30" height="30" /> {/* Add image */}
              <span className="ms-2">Logout</span> {/* Button text */}
            </Link>
          </div>
        </nav>
      </header>
    </div>
  );
};

export default Provider;

