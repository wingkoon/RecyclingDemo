import React, { useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { LoginContext } from './LoginContext'; //,  Assuming LoginContext holds state

function Logout() {
  const { setIsLoggedIn, setUserEmail, setUserType, setUserProfile } = useContext(LoginContext);
  const navigate = useNavigate();

  const handleLogout = async () => { // Make it asynchronous if needed for API calls
    try {
      // Perform logout logic here:
      // - Clear user data from local storage or cookies
      // - Send an API request to the server to invalidate the session (optional)
      setIsLoggedIn(false);
      setUserEmail('');
      setUserProfile('');
      navigate('/'); // Navigate to the home page after successful logout
    } catch (error) {
      console.error('Logout error:', error);
      // Handle logout errors gracefully, e.g., display an error message
    }
  };

  useEffect(() => {
    handleLogout(); // Call handleLogout on component mount
  }, []); // Empty dependency array ensures it runs only once

  return null; // Return nothing to avoid rendering any UI
}

export default Logout;
