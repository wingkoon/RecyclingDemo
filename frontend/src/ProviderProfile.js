import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';

function ProviderProfile() {
  const navigate = useNavigate();
  const [name, setName] = useState('');
  const [organization, setOrganization] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [isLoading, setIsLoading] = useState(true); // Track profile loading state

  const providerEmail = localStorage.getItem('providerEmail'); // Get stored email

  useEffect(() => {
    const fetchProfile = async () => {
      if (providerEmail) {
        try {
          const response = await fetch(`/api/provider/profile/${providerEmail}`); // Assume endpoint for accessing profile
          const data = await response.json();

          if (data.success) {
            setName(data.profile.name);
            setOrganization(data.profile.organization);
            setPhone(data.profile.phone);
            setAddress(data.profile.address);
          } else {
            console.error('Error fetching profile:', data.message);
            setErrorMessage('Error fetching profile. Please try again later.');
          }
        } catch (error) {
          console.error('Error contacting backend:', error);
          setErrorMessage('Network error. Please try again later.');
        } finally {
          setIsLoading(false); // Set loading state to false
        }
      }
    };

    fetchProfile();
  }, [providerEmail]); // Re-fetch profile on email change

  const handleProfileUpdate = async (e) => {
    e.preventDefault();
    setErrorMessage(''); // Clear any previous error messages

    try {
      const response = await fetch('/api/provider/profile', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: providerEmail,
          name,
          organization,
          phone,
          address,
        }),
      });

      const data = await response.json();

      if (data.success) {
        navigate('/provider'); // Redirect to provider page on success
      } else {
        setErrorMessage(data.message || 'Profile update failed.');
      }
    } catch (error) {
      console.error('Error contacting backend:', error);
      setErrorMessage('Network error. Please try again later.');
    }
  };

  return (
    <div className="provider-profile">
      <h1>Provider Profile</h1>
      {isLoading ? (
        <p>Loading profile...</p>
      ) : (
        <>
          {providerEmail ? (
            <form onSubmit={handleProfileUpdate}>
              <div className="input-container">
                <label htmlFor="name">Name:</label>
                <input
                  type="text"
                  id="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                />
              </div>
              <div className="input-container">
                <label htmlFor="organization">Organization:</label>
                <input
                  type="text"
                  id="organization"
                  value={organization}
                  onChange={(e) => setOrganization(e.target.value)}
                  required
                />
              </div>
              <div className="input-container">
                <label htmlFor="phone">Phone:</label>
                <input
                  type="tel"
                  id="phone"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  required
                />
              </div>
              <div className="input-container">
                <label htmlFor="address">Address:</label>
                <input
                  type="text"
                  id="address"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  required
                />
              </div>
              <button type="submit">Update Profile</button>
              {errorMessage && <p className="error-message">{errorMessage}</p>}
            </form>
          ) : (
            <p>Please login first. <Link to="/login">Login</Link></p>
          )}
        </>
      )}
    </div>
  );
}

export default ProviderProfile;
