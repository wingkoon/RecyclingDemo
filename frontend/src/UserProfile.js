import React, { useState, useEffect } from 'react';
import { Navigate } from 'react-router-dom';

const UserProfile = ({ userInfo, updateUserInfo }) => {
  const [name, setName] = useState(userInfo.name || '');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [address, setAddress] = useState('');
  const [location, setLocation] = useState(userInfo.location || '');

  // Fetch user information on component mount (if needed)
  useEffect(() => {
      const fetchUserProfile = async () => {
        try {
          // Replace with your actual API call and authorization logic (e.g., token)
          const response = await fetch('/api/user/profile', {
            headers: {
              'Authorization': `Bearer ${localStorage.getItem('authToken')}`, // Assuming token storage in localStorage
            },
          });
  
          if (response.ok) {
            const userProfileData = await response.json();
            setName(userProfileData.name);
            setPhone(userProfileData.phone);
            setEmail(userProfileData.email);
            setAddress(userProfileData.address);
            setLocation(userProfileData.location);
          } else {
            console.error('Error fetching user profile:', response.statusText);
            // Handle errors appropriately (e.g., redirect to login if unauthorized)
            navigate('/login'); // Potential redirection on error
          }
        } catch (error) {
          console.error('Error fetching user profile:', error);
          // Handle errors appropriately (e.g., display error message)
        }
      };
  
      fetchUserProfile();
    }, []); // Empty dependency array: fetch only once on mount
  
    // ... rest of the component logic (handleInputChange, handleSubmit)
  

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    switch (name) {
      case 'name':
        setName(value);
        break;
      case 'phone':
          setPhone(value);
          break;
      case 'email':
        setEmail(value);
        break;
      case 'address':
          setAddress(value);
          break;  
      case 'location':
        setLocation(value);
        break;
      default:
        break;
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    updateUserInfo({ name, phone, email, address, location }); // Pass updated info to parent
    navigate('/user');
  };

  return (
    <div className="user-profile">
      <h2>User Profile</h2>
      <form onSubmit={handleSubmit}>
        <label htmlFor="name">Name: </label>
        <input
          type="text"
          id="name"
          name="name"
          value={name}
          onChange={handleInputChange}
          required
        />
        <label htmlFor="phone">Phone Number: </label>
        <input
          type="text"
          id="phone"
          name="phone"
          value={phone}
          onChange={handleInputChange}
          required
        />
        <label htmlFor="email">Email: </label>
        <input
          type="text"
          id="email"
          name="email"
          value={email}
          onChange={handleInputChange}
          required
        />
        <label htmlFor="address">Contact Info: </label>
        <input
          type="text"
          id="address"
          name="address"
          value={address}
          onChange={handleInputChange}
          required
        />
        <label htmlFor="location">Location: </label>
        <input
          type="text"
          id="location"
          name="location"
          value={location}
          onChange={handleInputChange}
        />
        <button type="submit">Save Profile</button>
      </form>
    </div>
  );
};

export default UserProfile;

