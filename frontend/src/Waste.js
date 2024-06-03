import React, { useState, useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'; // For navigation
import { LoginContext } from './LoginContext'; // Assuming LoginContext.js is in the same directory
import axios from 'axios'; // Import Axios for HTTP requests
import Navigation from './NavigationBar';
import {townToId} from './Convert';

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
const wastePageStyle = {
  minHeight: 'calc(100vh - 100px)', // Set min-height for content area
  backgroundImage: `url(/back2.jpg)`, // Replace with your image path
  backgroundSize: 'cover', // Adjust background size as needed
  backgroundRepeat: 'no-repeat', // Prevent image repetition
  backgroundPosition: 'center', // Center background image
  display: 'flex', // Enable flexbox for vertical centering
  justifyContent: 'center', // Vertically center content within the area
  alignItems: 'center', // Horizontally center content within the area
};
function PostWastePage() {
  const { isLoggedIn, userEmail, userProfile } = useContext(LoginContext);
  const navigate = useNavigate();

  const [wasteType, setWasteType] = useState('paper');
  const [wasteQuantity, setWasteQuantity] = useState('');
  const [wasteCondition, setWasteCondition] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [matchedProviders, setMatchedProviders] = useState([]); // Array to store matched providers
  const [wasteId, setWasteId] = useState(0);
  const [onSubmit, setOnSubmit] = useState(false);

  useEffect(() => {
    // Clear error message on page load
    setErrorMessage('');
  }, []); // Empty dependency array to run only once
  
  
  const handleSubmit = async (e) => {
    e.preventDefault();
  setOnSubmit(true);
    setErrorMessage(''); // Clear any previous errors
  
    if (!wasteType || !wasteQuantity || !wasteCondition) {
      setErrorMessage('Please fill in all fields.');
      console.log(errorMessage);
    }
  
    if (!userProfile?.town) {
      setErrorMessage('Your profile is not complete. Please fill it up first.');
      console.log(errorMessage);
    }
    const townId = townToId(userProfile.town);
  
    try {
      
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
  const match = result.data.result;
  const id = result.data.id;
  setMatchedProviders(match);
      setWasteId(id);
      setMatchedProviders(match);
      setWasteId(id);
      console.log(matchedProviders, wasteId);
      console.log(match, id);
      console.log(wasteId);
      console.log(matchedProviders, wasteId);

    } catch (error) {
      console.error('Error:', error);
      // Handle other errors (e.g., network issues)
    }
  };
  

  const handleSaveRequest = async () => {
    // Simulate saving request data (replace with actual API call)
    if (!matchedProviders.length) {
      alert('No matching providers found for your waste type and town.');
      navigate('/user');
      return;
    }
const matchedurl = 'http://localhost:8001/api/matched';
const matchResponse = await axios.post(matchedurl, {userId: userProfile.id, wasteId: wasteId, matchresult: matchedProviders});
    
    alert('Waste request submitted successfully! We will contact you soon for pickup arrangements.', matchResponse);
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
    {/* Navigation bar (assuming Navigation is rendered here) */}
    <Navigation user={userEmail} usertype={'user'} />

    <h1 style={{ textAlign: 'center' }}>Post Waste</h1> {/* Center "Post Waste" text */}

    {!userProfile?.town && (
      <p>
        Please complete your profile to post waste requests.{' '}
        <a href="/user/profile">Go to Profile</a>
      </p>
    )}

    <div style={wastePageStyle}>
      <div className="wastepage container d-flex flex-column justify-content-center align-items-center">
        {userProfile?.town && (
          <form onSubmit={handleSubmit} className="waste-form"> {/* Add class for styling */}
            <div className="form-group"> {/* Wrap each input group in a div */}
              <label htmlFor="wasteType">Waste Type:</label>
              <select
                id="wasteType"
                value={wasteType}
                onChange={(e) => setWasteType(e.target.value)}
                required
              >
                {wasteTypes.map((type) => (
                  <option key={type} value={type}>
                    {type}
                  </option>
                ))}
              </select>
            </div>

            <div className="form-group"> {/* Another wrapper for quantity input */}
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
            </div>

            <div className="form-group"> {/* Wrapper for condition input */}
              <label htmlFor="wasteCondition">Details:</label>
              <input
                type="text"
                id="wasteCondition"
                value={wasteCondition}
                onChange={(e) => setWasteCondition(e.target.value)}
                required
                style={{ width: '400px' }}
              />
            </div>
            <button type="submit" onClick={handleSubmit}>Submit</button>
      


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
        {console.log(matchedProviders)};
        <button type="button" onClick={handleSaveRequest}>
          Request Service
        </button>
      </div>
    )}
    </form>
        )}
         {/* Display a message if no matched providers are found */}
         {matchedProviders.length === 0 && userProfile?.town && onSubmit === true && (
          <p>No matched service providers found for your waste type and location.</p>
        )}
      </div>
    </div>
  </div>
);
    
}

export default PostWastePage;

