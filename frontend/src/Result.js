import React, { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom'; // For navigation
import { LoginContext } from './LoginContext'; // Assuming LoginContext.js is in the same directory
import Navigation from './NavigationBar';
import axios from 'axios'; // Import Axios for HTTP requests
const backendUrl = 'http://localhost:8001';

function Result() {
  const [pendingResults, setPendingResults] = useState([]);
  const [confirmedResults, setConfirmedResults] = useState([]);
  const [selectedResult, setSelectedResult] = useState(null);
  const [schedule, setSchedule] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false); // Replace with your login check

  // Simulate API calls (replace with your actual implementation)
  const fetchPendingResults = async () => {
    const response = await fetch('/api/pending-matches'); // Replace with your API endpoint
    const data = await response.json();
    setPendingResults(data);
  };

  const fetchConfirmedResults = async () => {
    const response = await fetch('/api/confirmed-matches'); // Replace with your API endpoint
    const data = await response.json();
    setConfirmedResults(data);
  };

  const handleGiveService = (result) => {
    setSelectedResult(result);
    setSchedule(''); // Clear schedule on selection change
  };

  const handleScheduleChange = (event) => {
    setSchedule(event.target.value);
  };

  const handleSubmitSchedule = async () => {
    if (!schedule) {
      return; // Handle missing schedule input
    }

    const response = await fetch('/api/confirm-match', {
      method: 'POST',
      body: JSON.stringify({ ...selectedResult, schedule }), // Include schedule in request body
    });

    if (response.ok) {
      const updatedResult = { ...selectedResult, confirmed: true };
      setConfirmedResults([...confirmedResults, updatedResult]);
      setPendingResults(pendingResults.filter((r) => r.id !== selectedResult.id));
      setSelectedResult(null);
    } else {
      console.error('Failed to confirm match:', await response.text());
    }
  };

  useEffect(() => {
    if (isLoggedIn) { // Fetch data only if logged in
      fetchPendingResults();
      fetchConfirmedResults();
    }
  }, [isLoggedIn]); // Re-fetch data on login change

  return (
    <div>
      <h2>Matchmaking Results</h2>
      {isLoggedIn ? (
        <div>
          <h3>Pending Results</h3>
          {pendingResults.length > 0 ? (
            <ul>
              {pendingResults.map((result) => (
                <li key={result.id}>
                  <p>
                    User Address: {result.userAddress} | Waste Type: {result.wasteType} | Town: {result.town}
                  </p>
                  <button onClick={() => handleGiveService(result)}>Give Service</button>
                </li>
              ))}
            </ul>
          ) : (
            <p>No pending results.</p>
          )}

          {selectedResult && (
            <div>
              <h3>Schedule Service</h3>
              <p>
                Waste Type: {selectedResult.wasteType} | Town: {selectedResult.town} | User Address: {selectedResult.userAddress}
              </p>
              <input type="datetime-local" value={schedule} onChange={handleScheduleChange} />
              <button onClick={handleSubmitSchedule}>Submit Schedule</button>
            </div>
          )}

          <h3>Confirmed Results</h3>
          {confirmedResults.length > 0 ? (
            <ul>
              {confirmedResults.map((result) => (
                <li key={result.id}>
                  <p>
                    Waste Type: {result.wasteType} | Town: {result.town} | User Name: {result.userName} | User Phone: {result.userPhone} | User Email: {result.userEmail} | User Address: {result.userAddress} | Provider Organization: {result.providerOrganization} | Provider Phone: {result.providerPhone} | Provider Email: {result.providerEmail} | Schedule: {result.schedule}
                  </p>
                </li>
              ))}
            </ul>
          ) : (
            <p>No confirmed results.</p>
          )}
        </div>
      ) : (
        <p>Please login to view matchmaking results.</p>
      )}
    </div>
  );
}

export default Result;
