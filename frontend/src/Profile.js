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
function Profile() {
  const { isLoggedIn, userEmail, userProfile, setUserProfile } = useContext(LoginContext);
  const navigate = useNavigate();

  const [name, setName] = useState(userProfile?.name || ''); // Pre-fill name if available
  const [phone, setPhone] = useState(userProfile?.phone || ''); // Pre-fill phone if available
  const [address, setAddress] = useState(userProfile?.address || ''); // Pre-fill address if available
  const [town, setTown] = useState(userProfile?.town || towns[0]); // Pre-fill town if available
  const [province, setProvince] = useState(userProfile?.province || ''); // Pre-fill province if available
  const [country, setCountry] = useState(userProfile?.country || ''); // Pre-fill country if available
  const [errorMessage, setErrorMessage] = useState(''); // For error messages

  const handleSubmit = async(e) => {
    e.preventDefault();

    setErrorMessage(''); // Clear any previous errors

    if (!name || !phone || !address || !town || !province || !country) {
      setErrorMessage('Please fill all fields to complete your user profile.');
      return;
    }

    userProfile.name = name;
    userProfile.phone = phone;
    userProfile.address = address;
    userProfile.town = town;
    userProfile.province = province;
    userProfile.country = country;

    const url = `${backendUrl}/api/user/profile`;

    try {
      const response = await axios.post(url, {
        userProfile
      });
    // Simulate successful update (replace with actual API call or backend logic)
    alert('User profile updated successfully!');
    navigate('/user'); // Redirect to dashboard
  } catch (error) {
    setErrorMessage('Unable to update profile!');
      console.log('errorMessage:', errorMessage);
  }
  };

  if (!isLoggedIn) {
    return (
      <div>
        You are not logged in. Please <a href="/user/login">login first</a>.
      </div>
    );
  }

  return (
    <div className="profile-page container"> {/* container class for centering */}
    {/* Navigation bar (assuming Navigation is rendered here) */}
    <Navigation user={userEmail} usertype={'user'} />

    <div style={profilePageStyle}> {/* Apply custom styles */}
    <div className="profile-content"> 
      <h1>User Profile</h1>
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
            <div className="form-group mb-3">
              <label htmlFor="town">Town:</label>
              <select id="town" value={town} onChange={(e) => setTown(e.target.value)} required>
                {towns.map((townOption) => (
                  <option key={townOption} value={townOption}>
                    {townOption}
                  </option>
                ))}
              </select>
            </div>
            <div className="form-group mb-3">
              <label htmlFor="province">Province:</label>
              <input
                type="text"
                id="province"
                value={province}
                onChange={(e) => setProvince(e.target.value)}
                required
              />
            </div>
            <div className="form-group mb-3">
              <label htmlFor="country">Country:</label>
              <input
                type="text"
                id="country"
                value={country}
                onChange={(e) => setCountry(e.target.value)}
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

export default Profile;

