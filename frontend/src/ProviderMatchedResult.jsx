import React, { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom'; // For navigation
import { LoginContext } from './LoginContext'; // Assuming LoginContext.js is in the same directory
import Navigation from './NavigationBar';
import axios from 'axios'; // Import Axios for HTTP requests
import ScheduleInput from './ScheduleInput';
const profilePageStyle = {
  minHeight: 'calc(100vh - 100px)', // Set min-height for content area
  backgroundSize: 'cover', // Adjust background size as needed
  backgroundRepeat: 'no-repeat', // Prevent image repetition
  backgroundPosition: 'center', // Center background image
  display: 'flex', // Enable flexbox for vertical centering
  justifyContent: 'center', // Vertically center content within the area
  alignItems: 'center', // Horizontally center content within the area
};

const ProviderMatchedResult = () => {
  const { isLoggedIn, userEmail, userType, userProfile, setUserProfile } = useContext(LoginContext);
  const [matches, setMatches] = useState([]);
  const [pendingResults, setPendingResults] = useState([]);
  const [confirmedResults, setConfirmedResults] = useState([]);
  const backendUrl = 'http://localhost:8001';
  const fetchurl = `${backendUrl}/api/provider/result`;
  const url = `${backendUrl}/api/provider/match/confirm`;
  const [schedule, setSchedule] = useState('');
  const [isLoading, setIsLoading] = useState(true); // Initial loading state
  const [selectedMatch, setSelectedMatch] = useState(null); // To store the selected match for schedule input
  const [scheduleDate, setScheduleDate] = useState(null); 
  
  useEffect(() => {
    
    // Fetch data on component mount or login change
    if (isLoggedIn) {
      const fetchData = async () => {
        
        try {
          const response = await axios.post(fetchurl, { id: userProfile.id });

          const matches = response.data.match;
          setMatches(matches);
          

          // Separate pending and confirmed results (same as before)
          const pending = matches.filter(match => !match.confirmed);
          const confirmed = matches.filter(match => match.confirmed);
          setPendingResults(pending);
          setConfirmedResults(confirmed);
          setIsLoading(false);
        } catch (error) {
          console.error(error);
        } finally {
          setIsLoading(false); // Set loading state to false after fetching (regardless of success or error)
        }
      };

      fetchData();
    }
  }, [isLoggedIn, fetchurl, userProfile, isLoading]);

  // Function to handle submitting the schedule (parent component)
  const handleSubmitSchedule = async (schedule, match, scheduleDate) => {
    console.log("handle submit schedule is executed", schedule, match);
    try {
      console.log("Making API call to update schedule");
      const formattedSchedule = scheduleDate.toISOString();
      match.schedule = formattedSchedule;

      match.confirmed = true;
      
      const response = await axios.post(url, { match: match });

      if (!response.data.success) {
        throw new Error('Failed to update match');
      }
      const updatedMatch = match;
    
      // Update results in state (replace with your actual state update logic)
      setMatches(matches.map(m => (m._id === match._id ? updatedMatch : m)));
      setPendingResults(pendingResults.filter(m => m._id !== match._id));
      setConfirmedResults([...confirmedResults, updatedMatch]);
      
      
    } catch (error) {
      console.error(error);
      alert('Failed to update schedule');
    } finally {
      // Consider adding logic to reset loading state or visual feedback
      setSchedule(''); // Clear schedule input after submission (optional)
      setSelectedMatch(null); // Reset selected match after submission
    }
  };

  // Function to display the schedule input field (parent component)
  const handleGiveService = (match) => {
    
    setSelectedMatch(match); // Set the selected match for schedule input
    setShowScheduleInput(true); // Set state to show input (defined below)
    return null; // No need to return the component here (handled in JSX)
  };

  const [showScheduleInput, setShowScheduleInput] = useState(false);

  return (
    <div className="profile-page container"> {/* container class for centering */}
    {/* Navigation bar (assuming Navigation is rendered here) */}
    <Navigation user={userEmail} usertype={'provider'} />
    <div style={profilePageStyle}> {/* Apply custom styles */}
    <div className="profile-content"> 
      {isLoggedIn ? (
        <>
          {isLoading ? (
            <p>Loading results...</p>
          ) : (
            <>

              <h2>Pending Results</h2>
              {pendingResults.length > 0 ? (
                <ul>
                  {pendingResults.map((match) => (
                    <li key={match._id}>
                      <p>
      
      Waste Type: {match.waste.wastes_type} - Quantity: {match.waste.quantity} - Details: {match.waste.condition}
    </p>
    <p>
      Address: {match.client.address}, {match.client.town}
    </p>
    <button onClick={() => handleGiveService(match)}>Give Service</button>
  </li>
))}
              </ul>
            ) : (
              <p>No pending results found.</p>
            )}

              <h2>Confirmed Results</h2>
              {confirmedResults.length > 0 ? (
                <ul>
                  {confirmedResults.map((match) => (
                    <li key={match._id}>
                      <p>
                        Waste Type: {match.waste.wastes_type} - Quantity: {match.waste.quantity} - Details: {match.waste.condition}
                      </p>
                      <p>
                        Address: {match.client.address}, {match.client.town}
                      </p>
                      <p>
                        Phone: {match.client.phone} - Email: {match.client.email}
                      </p>
                      <p>
                        Provider: {userProfile.organization} - Email: {userProfile.email} - Schedule: {match.schedule}
                      </p>
                    </li>
                  ))}
                </ul>
              ) : (
                <p>No confirmed results found.</p>
              )}

              {showScheduleInput && selectedMatch && (
                <ScheduleInput match={selectedMatch} onSubmit={handleSubmitSchedule} />
              )}
            </>
          )}
        </>
      ) : (
        <div>
          <p>Please login first to view matched results.</p>
          <button onClick={() => window.location.href = '/provider/login'}>Login</button>
        </div>
      )}
    </div>
    </div>
    </div>
  );
};

export default ProviderMatchedResult;
