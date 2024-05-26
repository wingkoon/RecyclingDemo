import React, { useState, useEffect, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { LoginContext } from './LoginContext';

const Navigation = ({ user, usertype }) => {
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      // Redirect to login page for specific user type
      navigate(`/${usertype}/login`);
    }
  }, [user, usertype, navigate]); // Dependencies for redirect on user change

  return (
    <nav className="navbar navbar-expand-md navbar-dark bg-success">
      <Link className="navbar-brand" to={`/${usertype}`}>{usertype} Dashboard</Link>
      <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavAltMarkup"
              aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
        <span className="navbar-toggler-icon"></span>
      </button>
      {user && (
        <div className="navbar-nav">
            <span className="text-light" style={{ paddingRight: "10px" }}>Logged in as: {user}</span>
          <form method="POST" action="/logout">
            <button type="submit" className="btn btn-info">Logout</button>
          </form>
        </div>
      )}
    </nav>
  );
};

export default Navigation;

