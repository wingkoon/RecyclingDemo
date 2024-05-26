import React, { useState, useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'; // For navigation
import { LoginContext } from './LoginContext'; // Assuming LoginContext.js is in the same directory
import axios from 'axios'; // Import Axios for HTTP requests

const wasteTypes = [
  'Paper',
  'Steel',
  'Aluminum',
  'Laptop',
  'Computer',
  'Cell Phone',
  'Screen',
  'Bed',
  'Table',
  'Chair',
];

function PostWastePage() {
  const { isLoggedIn, userEmail, userProfile } = useContext(LoginContext);
  const navigate = useNavigate();

  const [wasteType, setWasteType] = useState('');
  const [wasteQuantity, setWasteQuantity] = useState('');
  const [wasteCondition, setWasteCondition] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [matchedProviders, setMatchedProviders] = useState([]); // Array to store matched providers
  const [wasteId, setWasteId] = useState(0);

  useEffect(() => {
    // Clear error message on page load
    setErrorMessage('');
  }, []); // Empty dependency array to run only once

  
  const handleSubmit = async (e) => {
    e.preventDefault();
  
    setErrorMessage(''); // Clear any previous errors
  
    if (!wasteType || !wasteQuantity || !wasteCondition) {
      setErrorMessage('Please fill in all fields.');
      return;
    }
  
    if (!userProfile?.town) {
      setErrorMessage('Your profile is not complete. Please fill it up first.');
      return;
    }
  
    try {
      const locationurl = 'http://localhost:8001/api/location';
      const response1 = await axios.post(locationurl, { town: userProfile.town });
      const townId = response1.data.id;
  
      const wasteurl = 'http://localhost:8001/api/user/waste';
      const result = await axios.post(wasteurl, {
        userId: userProfile.id,
        wasteType: wasteType,
        locationId: townId,
        quantity: wasteQuantity,
        condition: wasteCondition,
      });
  
      if (!result.data.success) {
        // Handle API error (display message, etc.)
        console.error('API error:', result.data.error);
        return; // Prevent further processing if API call failed
      }
  
      setMatchedProviders(result.data.result);
      setWasteId(result.data.id);
    } catch (error) {
      console.error('Error:', error);
      // Handle other errors (e.g., network issues)
    }
  };
  

  const handleSaveRequest = async () => {
    // Simulate saving request data (replace with actual API call)
    if (!matchedProviders.length) {
      alert('No matching providers found for your waste type and town.');
      return;
    }
const matchedurl = 'http://localhost:8001/api/matched';
const matchResponse = await axios.post(matchedurl, {userId: userProfile.id, wasteId: wasteId, providerId: matchedProviders.provider_id});
    

    alert('Waste request submitted successfully! We will contact you soon for pickup arrangements.');
    navigate('/user'); // Redirect to dashboard
  };

  if (!isLoggedIn) {
    return (
      <div>
        You are not logged in. Please <a href="/user/login">login first</a>.
      </div>
    );
  }
  
  return (
    <div>
      <h1>Post Waste</h1>
  
      {!userProfile?.town && (
        <p>
          Please complete your profile to post waste requests.{' '}
          <a href="/user/profile">Go to Profile</a>
        </p>
      )}
  
      {userProfile?.town && (
        <form onSubmit={handleSubmit}>
          <label htmlFor="wasteType">Waste Type:</label>
          <select id="wasteType" value={wasteType} onChange={(e) => setWasteType(e.target.value)} required>
            {wasteTypes.map((type) => (
              <option key={type} value={type}>
                {type}
              </option>
            ))}
          </select>
          <label htmlFor="wasteQuantity">Quantity:</label>
          <input
            type="number" // Specify number input type
            id="wasteQuantity"
            value={wasteQuantity}
            onChange={(e) => {
              // Ensure input is a non-negative integer
              const newQuantity = Math.max(0, parseInt(e.target.value, 10) || 1);
              setWasteQuantity(newQuantity);
            }}
            required
            min="1" // Set minimum value to 1
          />
          <label htmlFor="wasteCondition">Condition:</label>
          <input
            type="text"
            id="wasteCondition"
            value={wasteCondition}
            onChange={(e) => setWasteCondition(e.target.value)}
            required
          />
          <button type="submit">Submit</button>
        </form>
      )}
  
  {matchedProviders.length > 0 && (
  <div>
    <h2>Matched Providers:</h2>
    {matchedProviders.map((provider) => (
      <li key={provider.organization}> {/* Use organization as key */}
        <strong>Provider Name:</strong> {provider.organization} <br />
        <strong>Email:</strong> {provider.email} <br />
        <strong>Phone:</strong> {provider.phone} <br />
      </li>
    ))}
    <button type="button" onClick={handleSaveRequest}>Request Service</button>
  </div>
)}
    </div>
  );
}
        


export default PostWastePage;
