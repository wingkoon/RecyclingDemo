import React, { useState, useEffect, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom'; // Assuming you have React Router
import axios from 'axios'; // Import Axios for HTTP requests
import { LoginContext } from './LoginContext';

function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoginSelected, setIsLoginSelected] = useState(true); // Flag for login/register selection
  const [errorMessage, setErrorMessage] = useState(''); // Error message state
  const backendUrl = 'http://localhost:8001'; // More descriptive variable name
  const { setIsLoggedIn, setUserType, setUserEmail, setUserProfile } = useContext(LoginContext);

  const handleLogin = async () => {
    if (!email || !password) {
      setErrorMessage(''); // Clear any previous errors
      setErrorMessage('Please enter your email and password.');
      return; // Don't proceed if fields are empty
    }

    const url = `${backendUrl}/api/user/login`;
    const method = 'POST';

    try {
      const response = await axios.post(url, {
        email,
        password,
      });

      // Successful login
      setUserType('user'); // Assuming user type is always 'user' here
      setUserEmail(email);
      setUserProfile(response.data.userProfile); // Update user profile if provided by the backend
      setIsLoggedIn(true);

      navigate('/user'); // Navigate to user profile after successful login

    } catch (error) {
      setErrorMessage('Invalid email or password.Please Input Again!');
      console.log('errorMessage:', errorMessage); 
    }
  };

  const handleRegistration = async () => {
    if (!email || !password) {
      setErrorMessage(''); // Clear any previous errors
      setErrorMessage('Please enter your email and password.');
      return; // Don't proceed if fields are empty
    }

    const url = `${backendUrl}/api/user/register`;
    const method = 'POST';

    try {
      const response = await axios.post(url, {
        email,
        password,
      });

  setUserType('user'); // Assuming user type is always 'user' here
      setUserEmail(email);
      setIsLoggedIn(true);

      navigate('/user/profile'); // Navigate to user profile after successful registration
    } catch (error) {
      console.error('Registration error:', error);
      setErrorMessage('Email exists. Please login or register with a different email.');
    }
  };

  return (
    <div className="User login-register">
      <h2>{isLoginSelected ? 'Welcome! Please login' : 'New user? Please register'}</h2>
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

export default Login;
