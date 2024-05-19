import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom'; // Assuming you have React Router // Assuming you have React Router

function Profile() {
  const navigate = useNavigate();
  const [userEmail, setUserEmail] = useState(''); // User email (from session or login state)
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  const [town, setTown] = useState('');
  const [province, setProvince] = useState('');
  const [country, setCountry] = useState('');
  const [errorMessage, setErrorMessage] = useState(''); // Error message state
  const backport = 'http://localhost:8001'

  // Fetch user data on component mount (replace with actual API call)
  useEffect(() => {
    const storedEmail = localStorage.getItem('userEmail'); // Check for stored email
    if (storedEmail) {
      setUserEmail(storedEmail);
      // You could also fetch user data from your backend API here using the stored email
    } else {
      navigate('/user/login'); // Redirect to login if no email found
    }
  }, [navigate]);

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent default form submission

    // Check if all fields are filled
    if (!name || !phone || !address ||  !town || !province || !country) {
      setErrorMessage('Please fill in all the information.');
      return; // Prevent further processing if not complete
    }

    // Simulate data update (replace with actual API call)
    try {
      const response = await fetch(backport + '/api/user/profile', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name,
          phone,
          address,
          town,
          province,
          country,
          email: userEmail, // Use the stored email as identifier
        }),
      });
      navigate('/user');
      if (!response.ok) {
        console.error('Profile update failed:', response.statusText);
        setErrorMessage('Profile update failed. Please try again.');
        return; // Handle unsuccessful response
      }
  
      const data = await response.json();
      // Assuming the backend sends a success message in case of success
      navigate('/user'); // Redirect to user page on success
  
      
      
      
      
      
    } catch (error) {
      console.error('Profile update error:', error);
      // Handle API call errors
    }
  };

return (
  <div className="profile">
    {userEmail ? (
      <>
      <h1>Welcome to {userEmail}</h1>

        <h1>Your Profile</h1>
        <form onSubmit={handleSubmit}>
          <div className="input-container">
            <label htmlFor="name">Name:</label>
            <input type="text" id="name" value={name} onChange={(e) => setName(e.target.value)} required />
          </div>
          <div className="input-container">
            <label htmlFor="phone">Phone:</label>
            <input type="tel" id="phone" value={phone} onChange={(e) => setPhone(e.target.value)} required />
          </div>
          <div className="input-container">
            <label htmlFor="address">Address:</label>
            <input type="text" id="address" value={address} onChange={(e) => setAddress(e.target.value)} required />
          </div>
          <div className="input-container">
            <label htmlFor="town">Town:</label>
            <input type="text" id="town" value={town} onChange={(e) => setTown(e.target.value)} required />
          </div>
          <div className="input-container">
            <label htmlFor="province">Province:</label>
            <input type="text" id="province" value={province} onChange={(e) => setProvince(e.target.value)} required />
          </div>
          <div className="input-container">
            <label htmlFor="country">Country:</label>
            <input type="text" id="country" value={country} onChange={(e) => setCountry(e.target.value)} required />
          </div>
          <button type="submit">Submit</button>
          {errorMessage && <p className="error">{errorMessage}</p>}
        </form>
      </>
    ) : (
      <p>You are not logged in. Please <Link to="/user/login">login</Link> to access your profile.</p>
    )}
  </div>
);
}

export default Profile;

