import React, { useState } from 'react';

const WasteForCollection = ({ wasteDetails, setWasteDetails, wasteCategories }) => {
  const [wasteType, setWasteType] = useState('');
  const [wasteQuantity, setWasteQuantity] = useState(0);
  const [wasteCondition, setWasteCondition] = useState('');
  const [wasteDetailsText, setWasteDetailsText] = useState('');

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    switch (name) {
      case 'wasteType':
        setWasteType(value);
        break;
      case 'wasteQuantity':
        setWasteQuantity(parseInt(value, 10)); // Ensure numeric value
        break;
      case 'wasteCondition':
        setWasteCondition(value);
        break;
      case 'wasteDetailsText':
        setWasteDetailsText(value);
        break;
      default:
        break;
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    setWasteDetails({ ...wasteDetails, wasteType, wasteQuantity, wasteCondition, wasteDetailsText });
  };

  return (
    <div className="waste-for-collection">
      <h2>Waste for Collection</h2>
      <form onSubmit={handleSubmit}>
        <label htmlFor="wasteType">Waste Type: </label>
        <select id="wasteType" name="wasteType" value={wasteType} onChange={handleInputChange}>
          <option value="">Select Waste Type</option>
          {wasteCategories.map((category) => (
            <option key={category.id} value={category.id}>
              {category.category_name}
            </option>
          ))}
        </select>
        <label htmlFor="wasteQuantity">Waste Quantity: </label>
        <input
          type="number"
          id="wasteQuantity"
          name="wasteQuantity"
          value={wasteQuantity}
          onChange={handleInputChange}
          min="1" // Enforce minimum quantity of 1
          required
        />
        <label htmlFor="wasteCondition">Waste Condition: </label>
        <input
          type="text"
          id="wasteCondition"
          name="wasteCondition"
          value={wasteCondition}
          onChange={handleInputChange}
        />
        <label htmlFor="wasteDetailsText">Additional Details (optional): </label>
        <textarea
          id="wasteDetailsText"
          name="wasteDetailsText"
          value={wasteDetailsText}
          onChange={handleInputChange}
          rows="4"
        />
        <button type="submit">Submit Waste Details</button>
      </form>
    </div>
  );
};

export default WasteForCollection;

          
