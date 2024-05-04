import React, { useState, useEffect } from 'react';

function UserProfile() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [address, setAddress] = useState('');
  const [preferences, setPreferences] = useState([]); // Array to store user preferences

  // Fetches user data on initial render (replace with your actual data fetching logic)
  useEffect(() => {
    const fetchUserData = async () => {
      const response = await fetch('/api/user/profile');
      const data = await response.json();
      setName(data.name);
      setEmail(data.email);
      setAddress(data.address);
      setPreferences(data.preferences); // Assuming preferences are stored in user data
    };
    fetchUserData();
  }, []);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    switch (name) {
      case 'name':
        setName(value);
        break;
      case 'email':
        setEmail(value);
        break;
      case 'address':
        setAddress(value);
        break;
      case 'preference':
        // Handle preference selection (e.g., add/remove from preferences array)
        const selectedPreference = value;
        if (preferences.includes(selectedPreference)) {
          setPreferences(preferences.filter((pref) => pref !== selectedPreference));
        } else {
          setPreferences([...preferences, selectedPreference]);
        }
        break;
      default:
        break;
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    // Implement logic to send updated user data to your backend API for saving
    const updatedUserData = { name, email, address, preferences };
    const response = await fetch('/api/user/profile', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(updatedUserData),
    });

    if (!response.ok) {
      console.error('Profile update failed:', response.statusText);
      return;
    }

    console.log('Profile update successful!');
  };

  return (
    <div className="user-profile">
      <h1>User Profile</h1>
      <form onSubmit={handleSubmit}>
        <label htmlFor="name">
          Name:
        </label>
        <input
          type="text"
          id="name"
          value={name}
          onChange={handleInputChange}
          required
        />
        <label htmlFor="email">
          Email:
        </label>
        <input
          type="email"
          id="email"
          value={email}
          onChange={handleInputChange}
          required
        />
        <label htmlFor="address">
          Address:
        </label>
        <input
          type="text"
          id="address"
          value={address}
          onChange={handleInputChange}
          required
        />
        <label htmlFor="preferences">
          Preferences (Select all that apply):
        </label>
        <div className="preferences">
          {/* Replace with your actual list of preferences */}
          <label>
            <input
              type="checkbox"
              id="preference-paper"
              name="preference"
              value="paper"
              checked={preferences.includes('paper')}
              onChange={handleInputChange}
            />
            Paper
          </label>
          <label>
            <input
              type="checkbox"
              id="preference-plastic"
              name="preference"
              value="plastic"
              checked={preferences.includes('plastic')}
              onChange={handleInputChange}
            />
            Plastic
          </label>
          <label>
            <input
              type="checkbox"
              id="preference-glass"
              name="preference"
              value="glass"
              checked={preferences.includes('glass')}
              onChange={handleInputChange}
            />
            Glass
          </label>
        </div>
        <button type="submit">Save Profile</button>
      </form>
    </div>
  );
}

export default UserProfile;
