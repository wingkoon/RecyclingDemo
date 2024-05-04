import React, { useState } from 'react';

function UserAuth() {
  const [isSignup, setIsSignup] = useState(true); // Toggles between signup and login forms
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();
    
    // Implement logic to send user data (name, email, password) to your backend API for signup or login
    // Depending on isSignup state, handle signup or login requests

    // Example using a placeholder fetch request (replace with your actual backend interaction)
    const response = await fetch('http://your-backend-url/auth', {
      method: isSignup ? 'POST' : 'GET',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, email, password }),
    });

    if (!response.ok) {
      // Handle failed authentication (e.g., display error message)
      console.error('Authentication failed:', response.statusText);
      return;
    }

    // Handle successful authentication (e.g., redirect to main app or store user data securely)
    console.log('Authentication successful!');
  };

  const toggleForm = () => {
    setIsSignup(!isSignup);
  };

  return (
    <div className="user-auth">
      <h1>{isSignup ? 'Register' : 'Login'}</h1>
      <form onSubmit={handleSubmit}>
        {isSignup && (
          <label htmlFor="name">
            Name:
          </label>
        )}
        {isSignup && (
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        )}
        <label htmlFor="email">
          Email:
        </label>
        <input
          type="email"
          id="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <label htmlFor="password">
          Password:
        </label>
        <input
          type="password"
          id="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit">{isSignup ? 'Sign Up' : 'Login'}</button>
      </form>
      <p>
        {isSignup ? 'Already have an account?' : "Don't have an account?"}{' '}
        <span onClick={toggleForm}>{isSignup ? 'Login Here' : 'Sign Up'}</span>
      </p>
    </div>
  );
}

export default UserAuth;
