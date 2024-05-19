import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const wasteTypes = [
  { value: 'paper', label: 'Paper' },
  { value: 'steel', label: 'Steel' },
  { value: 'aluminum', label: 'Aluminum' },
  { value: 'laptop', label: 'Laptop' },
  { value: 'computer', label: 'Computer' },
  { value: 'cell phone', label: 'Cell Phone' },
  { value: 'screen', label: 'Screen' },
  { value: 'bed', label: 'Bed' },
  { value: 'table', label: 'Table' },
  { value: 'chair', label: 'chair' },
];

function PostWaste() {
  const navigate = useNavigate();
  const [userEmail, setUserEmail] = useState(localStorage.getItem('userEmail') || '');
  const [wasteType, setWasteType] = useState('');
  const [wasteQuantity, setWasteQuantity] = useState(0);
  const [wasteCondition, setWasteCondition] = useState('');
  const [wasteDetails, setWasteDetails] = useState('');
  const [serviceProviders, setServiceProviders] = useState([]); // Array to store matched providers
  const [errorMessage, setErrorMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false); // Flag for handling submit button state

  useEffect(() => {
    const storedEmail = localStorage.getItem('userEmail');
    if (!storedEmail) {
      navigate('/user/login'); // Redirect to login if no email found
    }
  }, [navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true); // Set submit button state to loading
    setErrorMessage(''); // Clear any previous error messages

    if (!wasteType || !wasteQuantity || !wasteCondition) {
      setErrorMessage('Please fill in all required fields.');
      setIsSubmitting(false); // Reset submit button state
      return;
    }

    try {
      const response = await fetch('/api/user/waste', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          userEmail,
          wasteType,
          wasteQuantity,
          wasteCondition,
          wasteDetails,
        }),
      });

      const data = await response.json();

      if (data.success) {
        console.log('Waste disposal request submitted successfully!');
        setServiceProviders(data.serviceProviders || []); // Update providers if found
        // If successful, search for service providers
        const searchResponse = await fetch(`/api/user/waste/search`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            userTown: localStorage.getItem('userTown') || '', // Assuming userTown is stored
            wasteType,
          }),
        });
        if (searchData.success) {
          setServiceProviders(searchData.providers || []); // Update providers if found
        } else {
          console.error('Error searching for service providers:', searchData.message);
          setErrorMessage('Error finding service providers. Please try again later.');
        }
      } else {
        console.error('Error submitting waste disposal request:', data.message);
        setErrorMessage(data.message || 'An error occurred. Please try again later.');
      }
    } catch (error) {
      console.error('Error contacting backend:', error);
      setErrorMessage('Network error. Please try again later.');
    } finally {
      setIsSubmitting(false); // Reset submit button state after processing
    }
  };

return (
  <div className="post-waste">
    {userEmail ? (
      <>
        <h1>Post Your Waste</h1>
        <form onSubmit={handleSubmit}>
          <div className="input-container">
            <label htmlFor="wasteType">Waste Type:</label>
            <select id="wasteType" value={wasteType} onChange={(e) => setWasteType(e.target.value)}>
              <option value="">-- Select Waste Type --</option>
              {wasteTypes.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>

          {/* Group remaining input fields for better readability */}
          <div className="input-group">
            <div className="input-container">
              <label htmlFor="wasteQuantity">Waste Quantity:</label>
              <input
                type="number"
                id="wasteQuantity"
                value={wasteQuantity}
                onChange={(e) => setWasteQuantity(e.target.value)}
                min="1"
                required
              />
            </div>
            <div className="input-container">
              <label htmlFor="wasteCondition">Waste Condition:</label>
              <input
                type="text"
                id="wasteCondition"
                value={wasteCondition}
                onChange={(e) => setWasteCondition(e.target.value)}
                required
              />
            </div>
            <div className="input-container">
              <label htmlFor="wasteDetails">Waste Details:</label>
              <input
                type="text"
                id="wasteDetails"
                value={wasteDetails}
                onChange={(e) => setWasteDetails(e.target.value)}
                required
              />
            </div>
          </div>

          <button type="submit" disabled={isSubmitting}>
            {isSubmitting ? 'Submitting...' : 'Submit'}
          </button>
        </form>
        {serviceProviders.length > 0 && (
          <div className="service-providers">
            <h2>Matched Service Providers:</h2>
            <ul>
              {serviceProviders.map((provider) => (
                <li key={provider.id}>
                  {provider.name} - {provider.phone}
                </li>
              ))}
            </ul>
            <p>We will soon contact you for the pickup arrangement.</p>
          </div>
        )}
      </>
    ) : (
      <p>
        Please login first. <Link to="/user/login">Login</Link>
      </p>
    )}
  </div>
);
};

export default PostWaste;