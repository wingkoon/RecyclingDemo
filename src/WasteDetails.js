import React, { useState } from 'react';

function WasteDetails({ onSubmit }) {
  const [details, setDetails] = useState({ type: '', location: '', amount: '' });

  const handleChange = (e) => {
    setDetails({ ...details, [e.target.name]: e.target.value });
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(details);
  }

  return (
    <form onSubmit={handleSubmit}>
      {/* Form fields for waste type, location, amount */}
      <button type="submit">Submit</button>
    </form>
  );
}

export default WasteDetails;
