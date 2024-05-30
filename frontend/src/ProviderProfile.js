import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom'; // For navigation
import { LoginContext } from './LoginContext'; // Assuming LoginContext.js is in the same directory
import Navigation from './NavigationBar';
import axios from 'axios'; // Import Axios for HTTP requests
const towns = ['Surrey', 'Burnaby', 'Vancouver', 'Richmond']; // Town options
const backendUrl = 'http://localhost:8001';

const profilePageStyle = {
  minHeight: 'calc(100vh - 100px)', // Set min-height for content area
  backgroundImage: `url(/back2.jpg)`, // Replace with your image path
  backgroundSize: 'cover', // Adjust background size as needed
  backgroundRepeat: 'no-repeat', // Prevent image repetition
  backgroundPosition: 'center', // Center background image
  display: 'flex', // Enable flexbox for vertical centering
  justifyContent: 'center', // Vertically center content within the area
  alignItems: 'center', // Horizontally center content within the area
};
function ProviderProfile() {
  const { isLoggedIn, userEmail, userType, userProfile, setUserProfile } = useContext(LoginContext);
  const navigate = useNavigate();

  const [name, setName] = useState(userProfile?.name || ''); // Pre-fill name if available
  const [phone, setPhone] = useState(userProfile?.phone || ''); // Pre-fill phone if available
  const [address, setAddress] = useState(userProfile?.address || ''); // Pre-fill address if available
  const [errorMessage, setErrorMessage] = useState(''); // For error messages
  const [organization, setOrganization] = useState(userProfile?.organization || '');
  

  const handleSubmit = async(e) => {
    e.preventDefault();

    setErrorMessage(''); // Clear any previous errors

    if (!name || !organization || !phone || !address ) {
      setErrorMessage('Please fill all fields to complete your user profile.');
      return;
    }
userProfile.name = name;
userProfile.organization = organization;
userProfile.phone = phone;
userProfile.address = address;
const url = `${backendUrl}/api/provider/profile`;

try {
  const response = await axios.post(url, {
    userProfile
  });
// Simulate successful update (replace with actual API call or backend logic)
alert('Provider profile updated successfully!');
navigate('/provider'); // Redirect to dashboard
} catch (error) {
setErrorMessage('Unable to update profile!');
  console.log('errorMessage:', errorMessage);
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
    <div className="profile-page container"> {/* container class for centering */}
    {/* Navigation bar (assuming Navigation is rendered here) */}
    <Navigation user={userEmail} usertype={'provider'} />

    <div style={profilePageStyle}> {/* Apply custom styles */}
    <div className="profile-content"> 
      <h1>Service Provider Profile</h1>
      {errorMessage && <p className="error-message">{errorMessage}</p>}
      <form onSubmit={handleSubmit}>
        <div className="form-group mb-3">
              <label htmlFor="name">Name:</label>
              <input
                type="text"
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>
            <div className="form-group mb-3">
              <label htmlFor="organization">Organization:</label>
              <input
                type="text" // Specify phone input type
                id="organization"
                value={organization}
                onChange={(e) => setOrganization(e.target.value)}
                required
              />
            </div>
            <div className="form-group mb-3">
              <label htmlFor="phone">Phone:</label>
              <input
                type="tel" // Specify phone input type
                id="phone"
                value={phone}
                maxLength="10"
                onChange={(e) => setPhone(e.target.value)}
                required
              />
            </div>
            <div className="form-group mb-3">
              <label htmlFor="address">Address:</label>
              <input
                type="text"
                id="address"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                required
              />
            </div>

            {/* Add more form groups for additional fields here */}
            <button type="submit">Submit</button>
          </form>
        </div>
      </div>
      </div>
  );
}

export default ProviderProfile;

