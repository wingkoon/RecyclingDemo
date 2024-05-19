// LoginForm.js

import React from 'react';

const LoginForm = ({ email, setEmail, password, setPassword }) => {
  const handleSubmit = (e) => {
    e.preventDefault(); // Prevent default form submission behavior
    // Replace with your actual login logic using username and password
    console.log('Login attempt with email:', email, 'and password:', password);
  };

  return (
    <form onSubmit={handleSubmit}> {/* Pass handleSubmit function */}
      <label htmlFor="email">Email:</label>
      <input
        type="text"
        id="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <label htmlFor="password">Password:</label>
      <input
        type="password"
        id="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button type="submit">Login</button>
    </form>
  );
};

export default LoginForm;
