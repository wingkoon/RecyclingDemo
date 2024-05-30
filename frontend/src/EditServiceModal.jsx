import React, { useState, useEffect } from 'react';
import { fetchService, updateService } from './api'; // Replace with your API calls

function EditServiceModal({ serviceId, onClose, onUpdate }) {
  const [service, setService] = useState({});
  const [wasteType, setWasteType] = useState('');
  const [town, setTown] = useState('');

  useEffect(() => {
    const fetchServiceData = async () => {
      const response = await fetchService(serviceId); // Replace with your API call
      setService(response.data);
      setWasteType(response.data.wasteType);
      setTown(response.data.town);
    };

    if (serviceId) {
      fetchServiceData();
    }
  }, [serviceId]);

  const handleChange = (event) => {
    const { name, value } = event.target;
    switch (name) {
      case 'wasteType':
        setWasteType(value);
        break;
      case 'town':
        setTown(value);
        break;
      default:
        break;
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const updatedService = { ...service, wasteType, town };
    await updateService(updatedService); // Replace with your updateService API call
    onClose();
    onUpdate(updatedService);
  };

  return (
    <div className="modal">
      <h2>Edit Service</h2>
      <form onSubmit={handleSubmit}>
        <label htmlFor="wasteType">Waste Type:</label>
        <select name="wasteType" id="wasteType" value={wasteType} onChange={handleChange}>
          <option value="paper">Paper</option>
          <option value="steel">Steel</option>
          <option value="aluminum">Aluminum</option>
          <option value="laptop">Laptop</option>
          <option value="computer">Computer</option>
          <option value="cell phone">Cell Phone</option>
          <option value="screen">Screen</option>
          <option value="bed">Bed</option>
          <option value="table">Table</option>
          <option value="chair">Chair</option>
        </select>
        <label htmlFor="town">Town:</label>
        <select name="town" id="town" value={town} onChange={handleChange}>
          <option value="surrey">Surrey</option>
          <option value="burnaby">Burnaby</option>
          <option value="vancouver">Vancouver</option>
          <option value="richmond">Richmond</option>
        </select>
        <button type="submit">Confirm Changes</button>
      </form>
      <button onClick={onClose}>Close</button>
    </div>
  );
}

export default EditServiceModal;
