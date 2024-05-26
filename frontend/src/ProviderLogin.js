import React, { useState, useEffect, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom'; // Assuming you have React Router
import axios from 'axios'; // Import Axios for HTTP requests
import { LoginContext } from './LoginContext';

function ProviderLogin() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoginSelected, setIsLoginSelected] = useState(true); // Flag for login/register selection
  const [errorMessage, setErrorMessage] = useState(''); // Error message state
  const backendUrl = 'http://localhost:8001'; // More descriptive variable name
  const { setIsLoggedIn, setUserType, setUserEmail, setUserProfile } = useContext(LoginContext);
setUserType('provider');

  const handleLogin = async () => {
    if (!email || !password) {
      setErrorMessage(''); // Clear any previous errors
      setErrorMessage('Please enter your email and password.');
      return; // Don't proceed if fields are empty
    }

    const url = `${backendUrl}/api/provider/login`;
    const method = 'POST';

    try {
      const response = await axios.post(url, {
        email,
        password,
      });

      if (!response.data.success) {
        setErrorMessage(response.data.message || 'Invalid email or password.');
        return; // Handle login failure gracefully
      }

      // Successful login
      setUserType('provider'); // Assuming user type is always 'user' here
      setUserEmail(email);
      setUserProfile(response.data.userProfile); // Update user profile if provided by the backend
      setIsLoggedIn(true);

      navigate('/provider'); // Navigate to user profile after successful login
    } catch (error) {
      console.error('Login error:', error);
    }
  };

  const handleRegistration = async () => {
    if (!email || !password) {
      setErrorMessage(''); // Clear any previous errors
      setErrorMessage('Please enter your email and password.');
      return; // Don't proceed if fields are empty
    }

    const url = `${backendUrl}/api/provider/register`;
    const method = 'POST';

    try {
      const response = await axios.post(url, {
        email,
        password,
      });
if (response.data.success) {
  setUserType('provider'); // Assuming user type is always 'user' here
      setUserEmail(email);
      setIsLoggedIn(true);

      navigate('/provider/profile'); // Navigate to user profile after successful registration
}
      if (!response.data.success) {
        setErrorMessage(response.data.message || 'Email exists. Please login or register with a different email.');
        return; // Handle registration failure gracefully
      }

      // Successful registration
      setUserType('provider'); // Assuming user type is always 'user' here
      setUserEmail(email);
      setIsLoggedIn(true);

      navigate('/provider/profile'); // Navigate to user profile after successful registration
    } catch (error) {
      console.error('Registration error:', error);
    
    }
  };

  return (
    <div className="login-register">
      <h2>{isLoginSelected ? 'Welcome! Service Provider Please login' : 'New user? Please register'}</h2>
      <form onSubmit={(e) => e.preventDefault()}> {/* Prevent default form submission */}
        <label htmlFor="email">Email:</label>
        <input type="email" id="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
        <label htmlFor="password">Password:</label>
        <input type="password" id="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
        <button type="button" onClick={isLoginSelected ? handleLogin : handleRegistration}>
          {isLoginSelected ? 'Login' : 'Register'}
        </button>
      </form>
      {errorMessage && <p className="error">{errorMessage}</p>}
      <button onClick={() => setIsLoginSelected(!isLoginSelected)}>
        {isLoginSelected ? 'New user? Please register' : 'Already have an account? Login'}
      </button>
    </div>
  );
}

export default ProviderLogin;
