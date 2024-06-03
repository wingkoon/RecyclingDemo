import React, { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom'; // For navigation
import { LoginContext } from './LoginContext'; // Assuming LoginContext.js is in the same directory
import Navigation from './NavigationBar';
import axios from 'axios'; // Import Axios for HTTP requests

const profilePageStyle = {
  minHeight: 'calc(100vh - 100px)', // Set min-height for content area
  backgroundSize: 'cover', // Adjust background size as needed
  backgroundRepeat: 'no-repeat', // Prevent image repetition
  backgroundPosition: 'center', // Center background image
  display: 'flex', // Enable flexbox for vertical centering
  justifyContent: 'center', // Vertically center content within the area
  alignItems: 'center', // Horizontally center content within the area
};
function MatchmakingResults() {
  const { isLoggedIn, userEmail, userType, userProfile, setUserProfile } = useContext(LoginContext);
  const navigate = useNavigate();
  const [matches, setMatches] = useState([]); // Array to store matched results
  const [isLoading, setIsLoading] = useState(false); // Loading state
  const url = 'http://localhost:8001/api/user/result';

  // Fetch matched results on component mount (assuming login is handled elsewhere)
  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const response = await axios.post(url, { id: userProfile.id });
        setMatches(response.data.match); // Assuming data is in response.data]
      } catch (error) {
        console.error(error);
        // Handle error (e.g., display an error message)
      } finally {
        setIsLoading(false);
      }
    };

    if (isLoggedIn) {
      fetchData();
    }
  }, [isLoggedIn, userProfile, matches]); // Re-run effect when login status changes

  // Function to handle login logic (replace with your implementation)
  const handleLogin = () => {
    navigate('/user/login'); // Simulate login (replace with actual logic)
  };

  return (
    <div className="profile-page container"> {/* container class for centering */}
    {/* Navigation bar (assuming Navigation is rendered here) */}
    <Navigation user={userEmail} usertype={'user'} />

    <div style={profilePageStyle}> {/* Apply custom styles */}
    <div className="profile-content"> 
      {isLoggedIn ? (
        isLoading ? (
          <p>Loading matches...</p>
        ) : matches.length === 0 ? (
          <p>No confirmed matches yet.</p>
        ) : (
          <ul>
            {matches.map((match) => (
              match.confirmed && (
                <li key={match.id}>
                  {/* Display confirmed match details */}
                  <p>Waste Type: {match.waste.wastes_type}  Waste Quantity: {match.waste.quantity}</p>
                  <p>Waste Details: {match.waste.condition}</p>
                  <p>Town: {userProfile.town}</p>
                  <p>Request Time: {match.created_at}</p>
                  <p>Provider Organization: {match.provider.organization}</p>
                  <p>Provider Phone: {match.provider.phone}</p>
                  <p>Provider Email: {match.provider.email}</p>
                  <p>Schedule: {match.schedule}</p>
                </li>
              )
            ))}
          </ul>
        )
      ) : (
        <div>
          <p>Please login to view your confirmed matches.</p>
          <button onClick={handleLogin}>Login</button>
        </div>
      )}
    </div>
    </div>
    </div>
  );
}

export default MatchmakingResults;
