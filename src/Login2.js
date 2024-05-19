import React from 'react';

const Login = () => {
  return (
    <div className="login-signup">
      <h2>Welcome!</h2>
      <button>Login as User</button>
      <button>Login as Service Provider</button>
      <p>Don't have an account? Sign up here!</p>
    </div>
  );
};

export default Login;


// Login.js

import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import LoginForm from './LoginForm'; // Import LoginForm component

function Login() {
  const navigate = useNavigate(); // Hook for navigation
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

    return (
      <div className="login-signup">
         navigate('/login');
        document.body.innerHTML = '';
        <h2>Welcome! Please Login</h2>
        <LoginForm
          username={username}
          setUsername={setUsername}
          password={password}
          setPassword={setPassword}
        />
      </div>
    );
  };



export default Login;

import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom'; // Assuming you have React Router
import LoginForm from './LoginForm';

function Login() {
  const navigate = useNavigate(); // Hook for navigation
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLoginClick = () => {
    navigate('/login'); // Navigate to /login route on button click
  };

  return (
    <div className="login-signup">
      <h2>Welcome! Please Login</h2>
      {/* Render Link component intentionally (replaced with button for clarity) */}
      <button className="button" onClick={handleLoginClick}>
        Login
      </button>
      {/* Don't modify DOM directly (removed document.body.innerHTML) */}
      {/* Login form (assuming you have a LoginForm component) */}
      <LoginForm
        username={username}
        setUsername={setUsername}
        password={password}
        setPassword={setPassword}
      />
    </div>
  );
}

export default Login;