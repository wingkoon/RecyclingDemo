import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';

function User() {
  const navigate = useNavigate();
  const [userEmail, setUserEmail] = useState(localStorage.getItem('userEmail') || '');

  useEffect(() => {
    const storedEmail = localStorage.getItem('userEmail');
    if (!storedEmail) {
      navigate('/user/login'); // Redirect to login if no email found
    } else {
      setUserEmail(storedEmail);
    }
  }, [navigate]);

  return (
    <div className="user-dashboard">
      {userEmail ? (
        <>
          <h1>Logged in as {userEmail}</h1>
          <nav>
            <ul>
              <li>
                <Link to="/user/profile">User Profile</Link>
              </li>
              <li>
                <Link to="/user/waste">Dispose Recyclable Waste</Link>
              </li>
              <li>
                <Link to="/user/result">Matchmaking Results</Link>
              </li>
            </ul>
          </nav>
        </>
      ) : (
        <p>
          Please login first. <Link to="/user/login">Login</Link>
        </p>
      )}
    </div>
  );
}

export default User;
