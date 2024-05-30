import React, { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom'; // For navigation
import { LoginContext } from './LoginContext'; // Assuming LoginContext.js is in the same directory
import Navigation from './NavigationBar';
import axios from 'axios'; // Import Axios for HTTP requests

function ProviderMatchedResult({ user, fetchPendingMatches, fetchConfirmedMatches }) {
  const { isLoggedIn, userEmail, userType, userProfile, setUserProfile } = useContext(LoginContext);
  const navigate = useNavigate();
  const [matches, setMatches] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [pendingMatches, setPendingMatches] = useState([]);
  const [confirmedMatches, setConfirmedMatches] = useState([]);
  const [selectedMatch, setSelectedMatch] = useState(null); // Track selected pending match for schedule input
  const [scheduleInput, setScheduleInput] = useState(''); // State for provider's schedule input
  const backendUrl = 'http://localhost:8001';

  useEffect(() => {
    const fetchData = async () => {
      const fetchurl = `${backendUrl}/api/provider/result`; // Use your actual backend URL
      const response = await axios.post(fetchurl, { id: userProfile.id });
      const fetchedMatches = response.data; // Assuming response.data contains the match data

      setMatches(fetchedMatches.map((match) => ({ ...match, confirmed: match.confirmed === true })));
      setIsLoading(false); // Set loading to false after data retrieval
    };

    fetchData();
  }, [userProfile.id]); // Update only when userProfile.id changes

  useEffect(() => {
    if (matches.length > 0) {
      const pending = matches.filter((match) => !match.confirmed);
      const confirmed = matches.filter((match) => match.confirmed);
      setPendingMatches(pending);
      setConfirmedMatches(confirmed);
    }
  }, [matches]); // Update only when matches changes


  const handleGiveService = (match) => {
    setSelectedMatch(match);
    setScheduleInput(''); // Clear schedule input on new selection
  };

  const handleScheduleChange = (event) => {
    setScheduleInput(event.target.value);
  };

  const handleSubmitSchedule = async (match) => {
    // Implement your API call to update the database with the schedule
    const url = `${backendUrl}/api/provider/match/confirm`; // Use your actual backend URL
    const response = await axios.post(url, { match: match });
    if (response.success) {
      const updatedMatches = matches.map((m) => (m.id === match.id ? { ...m, confirmed: true } : m));
      setMatches(updatedMatches);
      setSelectedMatch(null);
    } else {
      console.error('Error updating match schedule:', response.error);
      // Handle errors appropriately (e.g., display error message)
    }
  };

  if (!isLoggedIn) {
    return (
      <div>
        You are not logged in. Please <a href="/provider/login">login first</a>.
      </div>
    );
  }

  return (
    <div>
      <h2>Matched Service Requests</h2>
      
        <>
          <h3>Pending Requests ({pendingMatches.length})</h3>

          <ul>
            {matches.map((match) => (
              !match.confirmed && (
                <li key={match.id}>
                  <p>
                    Waste Type: {match.waste.wastes_type} - Quantity: {match.waste.quantity} - Details: {match.waste.condition}
                  </p>
                  <p>
                    Address: {match.client.address}, {match.client.town}
                  </p>
                  <button onClick={() => handleGiveService(match)}>Give Service</button>
                </li>
              )
            ))}
          </ul>

          <h3>Confirmed Requests({confirmedMatches.length})</h3>
          <ul>
            {matches.map((match) => (
              match.confirmed && (
                <li key={match.id}>
                  <p>
                    Waste Type: {match.waste.waste_type} - Quantity: {match.waste.quantity} - Details: {match.waste.condition}
                  </p>
                  <p>
                    Address: {match.client.address}, {match.client.town}
                  </p>
                  <p>
                    Client Contact: Phone: {match.client.phone}, Email: {match.client.email}
                  </p>
                    <p>
  Provider Info: Organization: {userProfile.organization}, Email: {match.provider.email} {/* Assuming a typo here, use match.provider.email */}
</p>
<p>Schedule: {match.schedule}</p>
                </li>
              )
            ))}
          </ul>
        </>
      
      {selectedMatch && (
        <div>
          <h3>Schedule Service for {selectedMatch.client.wasteType}</h3>
          <input type="text" value={scheduleInput} onChange={handleScheduleChange} placeholder="Enter pick-up date and time" />
          <button onClick={() => handleSubmitSchedule(selectedMatch)}>Submit Schedule</button>
        </div>
      )}
    </div>
  );
}

export default ProviderMatchedResult;

