import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom'; // Assuming you have React Router
import axios from 'axios'; // Import Axios for HTTP requests

function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoginSelected, setIsLoginSelected] = useState(true); // Flag for login/register selection
  const [errorMessage, setErrorMessage] = useState(''); // Error message state

  // Submit form handler
  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent default form submission

    if (!email || !password) {
      setErrorMessage(''); // Clear any previous errors
      return; // Don't proceed if fields are empty
    }

    const url = isLoginSelected ? '/api/user/login' : '/api/user/register';
    const method = 'POST'; // Both login and registration use POST
    localStorage.setItem('userEmail', email); 

    // Redirect to profile after "success"
    navigate('/user/profile');
  
      try {
        // Send login data to the backend for validation
        const body = JSON.stringify({ email, password });
        const response = await fetch(url, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: body,
        });

const data = await response.data;

      if (response.ok) {
        if (isLoginSelected) {
          // Login successful, handle authorization (replace with logic based on your backend response)
          if (data.token) { // Check if backend provides a token
            localStorage.setItem('authToken', data.token); // Store token in local storage (example)
          }
          navigate('/user/profile'); // Redirect to profile after login
        } else {
          // Registration successful, handle authorization (replace with logic)
          if (data.token) {
            localStorage.setItem('authToken', data.token); // Store token in local storage (example)
          }
          setErrorMessage('Registration successful! You are now logged in.');
          navigate('/user/profile'); // Redirect to profile after registration
        }
      } else {
        setErrorMessage(data.message || (isLoginSelected ? 'Login failed.' : 'Registration failed.'));
      }
    } catch (error) {
      console.error(isLoginSelected ? 'Login error:' : 'Registration error:', error);
      setErrorMessage(isLoginSelected ? 'Login error. Please try again.' : 'Registration error. Please try again.');
    }
  };

  return (
    <div className="login-register">
      <h2>{isLoginSelected ? 'Welcome! Please login' : 'New user? Please register'}</h2>
      <form onSubmit={handleSubmit}>
        <label htmlFor="email">Email:</label>
        <input type="email" id="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
        <label htmlFor="password">Password:</label>
        <input type="password" id="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
        <button type="submit">{isLoginSelected ? 'Login' : 'Register'}</button>
      </form>
      {errorMessage && <p className="error">{errorMessage}</p>}
      <button onClick={() => setIsLoginSelected(!isLoginSelected)}>
        {isLoginSelected ? 'New user? Please register' : 'Already have an account? Login'}
      </button>
    </div>
  );
}

export default Login;

