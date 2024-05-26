import React from 'react';
import WasteDetails from './WasteDetails';

function UserDashboard({ userData }) {
  const [wasteDetails, setWasteDetails] = useState({});

  const handleWasteDetailsSubmit = (data) => {
    setWasteDetails(data);
    // Simulate finding matching services
    const matchedServices = []; // Find matching services based on wasteDetails
  }

  return (
    <div>
      <h2>Welcome, {userData.name}</h2>
      <WasteDetails onSubmit={handleWasteDetailsSubmit} />
      {wasteDetails.type && (
        <p>Matching services will be displayed here based on your waste details.</p>
      )}
    </div>
  );
}

export default UserDashboard;
