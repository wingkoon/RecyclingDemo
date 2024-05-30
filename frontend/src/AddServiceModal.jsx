import React, { useState } from 'react';

function AddServiceModal({ onSubmit, onClose, wasteTypes, towns, selectedWasteType, selectedTown }) {
  const [internalSelectedWasteType, setInternalSelectedWasteType] = useState(selectedWasteType || wasteTypes[0]); // Use default or initial value
  const [internalSelectedTown, setInternalSelectedTown] = useState(selectedTown || towns[0]); // Use default or initial value

  const handleSubmit = (e) => {
    e.preventDefault(); // Prevent default form submission behavior
    if (internalSelectedWasteType && internalSelectedTown) {
      onSubmit({ wasteType: internalSelectedWasteType, town: internalSelectedTown });
      // **Don't reset selections here** (keep commented out)
    } else {
      alert('Please select the service information.');
    }
  };

  const handleWasteTypeChange = (event) => {
    setInternalSelectedWasteType(event.target.value);
  };

  const handleLocationChange = (event) => {
    setInternalSelectedTown(event.target.value);
  };

  return (
    <div className="add-service-modal">
      <h2>Add Service</h2>
      <form onSubmit={handleSubmit}>
        <select value={internalSelectedWasteType} onChange={handleWasteTypeChange}>
          {/* Set the first element of wasteTypes as the default selected option */}
          <option value={wasteTypes[0]}>{wasteTypes[0]}</option>
          {wasteTypes.slice(1).map((wasteType) => ( // Start mapping from index 1
            <option key={wasteType} value={wasteType}>
              {wasteType}
            </option>
          ))}
        </select>
        <select value={internalSelectedTown} onChange={handleLocationChange}>
          {/* Set the first element of towns as the default selected option */}
          <option value={towns[0]}>{towns[0]}</option>
          {towns.slice(1).map((town) => ( // Start mapping from index 1
            <option key={town} value={town}>
              {town}
            </option>
          ))}
        </select>
        <button type="submit">Add Service</button>
      </form>
      <button onClick={onClose}>Close</button>
    </div>
  );
}

export default AddServiceModal;
