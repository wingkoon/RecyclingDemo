import React, { useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'; // For navigation
import { LoginContext } from './LoginContext'; // Assuming LoginContext holds state

function Logout() {
  const { setIsLoggedIn, setUserEmail, setUserType, setUserProfile } = useContext(LoginContext);
  const navigate = useNavigate();

  useEffect(() => {
    const handleLogout = () => {
      setIsLoggedIn(false);
      setUserEmail('');
      setUserProfile('');
      navigate('/');  // Navigate to the home page after logout
    };

    handleLogout(); // Call handleLogout on component mount
  }, []); // Empty dependency array ensures it runs only once

  return null; // Return nothing to avoid rendering any UI
}

export default Logout;
