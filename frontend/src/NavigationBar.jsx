import React, { useState, useEffect, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { LoginContext } from './LoginContext';
import Logout from './Logout';

const Navigation = ({ user, usertype }) => {
  const navigate = useNavigate();
  const { setIsLoggedIn, setUserEmail, setUserType, setUserProfile } = useContext(LoginContext);
  useEffect(() => {
    if (!user) {
      // Redirect to login page for specific user type
      navigate(`/${usertype}/login`);
    }
  }, [user, usertype, navigate]); // Dependencies for redirect on user change
  const handleLogout = () => {
    setIsLoggedIn(false);
    setUserEmail('');
    setUserProfile('');
    navigate('/');
  };
 
  return (
    <nav className="navbar navbar-expand-md navbar-dark bg-success">
      <Link className="navbar-brand" to={`/${usertype}`}>{usertype} Dashboard</Link>
      <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavAltMarkup"
              aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
        <span className="navbar-toggler-icon"></span>
      </button>
      {user && (
        <div className="navbar-nav">
            <span className="text-light" style={{ paddingLeft: "400px", paddingRight: "300px" }}>Logged in as: {user}</span>
            <form><Link to="/" onClick={handleLogout}>
            <button type="submit" className="btn btn-info">Logout</button></Link>
          </form>
        </div>
      )}
    </nav>
  );
};

export default Navigation;

