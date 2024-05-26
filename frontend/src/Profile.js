import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom'; // For navigation
import { LoginContext } from './LoginContext'; // Assuming LoginContext.js is in the same directory
import Navigation from './NavigationBar';
const towns = ['Surrey', 'Burnaby', 'Vancouver', 'Richmond']; // Town options

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

  const handleSubmit = (e) => {
    e.preventDefault();

    setErrorMessage(''); // Clear any previous errors

    if (!name || !phone || !address || !town || !province || !country) {
      setErrorMessage('Please fill all fields to complete your user profile.');
      return;
    }

    const updatedProfile = {
      name,
      phone,
      address,
      town,
      province,
      country,
    };

    setUserProfile(updatedProfile); // Update user profile in context

    // Simulate successful update (replace with actual API call or backend logic)
    alert('User profile updated successfully!');
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
    <div className="profile-page">
      {/* Your Profile page content */}
      <Navigation user={userEmail} usertype={'user'} />
<div>
      <h1>User Profile</h1>
      {errorMessage && <p className="error-message">{errorMessage}</p>}
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="name">Name:</label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="phone">Phone:</label>
          <input
            type="tel" // Specify phone input type
            id="phone"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="address">Address:</label>
          <input
            type="text"
            id="address"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="town">Town:</label>
          <select id="town" value={town} onChange={(e) => setTown(e.target.value)} required>
            {towns.map((townOption) => (
              <option key={townOption} value={townOption}>
                {townOption}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label htmlFor="province">Province:</label>
          <input
            type="text"
            id="province"
            value={province}
            onChange={(e) => setProvince(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="country">Country:</label>
          <input
            type="text"
            id="country"
            value={country}
            onChange={(e) => setCountry(e.target.value)}
            required
          />
        </div>
        <button type="submit">Submit</button>
      </form>
    </div>
    </div>
  );
}

export default Profile;

