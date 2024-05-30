import React, { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import AddServiceModal from './AddServiceModal'; // Import AddServiceModal component
import { idToTown, townToId } from './Convert'; // Replace with your path
import { LoginContext } from './LoginContext'; // Assuming LoginContext.js is in the same directory
import Navigation from './NavigationBar';
import axios from 'axios'; // Import Axios for HTTP requests

function ServiceOfferPage() {
  const navigate = useNavigate();
  const { isLoggedIn, userEmail, userType, userProfile } = useContext(LoginContext);
  const [services, setServices] = useState([]);
  const [wasteTypes] = useState(['paper', 'steel', 'aluminum', 'laptop', 'computer', 'cell phone', 'screen', 'bed', 'table', 'chair']);
  const [towns] = useState(['Surrey', 'Burnaby', 'Vancouver', 'Richmond']);
  const [addedServices, setAddedServices] = useState([]); // Array to track added services (with location_id)
  const [deletedServices, setDeletedServices] = useState([]); // Array to track deleted services (with location_id)
  const backendUrl = 'http://localhost:8001';
  const [addServiceModalOpen, setAddServiceModalOpen] = useState(false); // Corrected: Removed duplicate declaration
  const [selectedWasteType, setSelectedWasteType] = useState(''); // State for selected waste type
  const [selectedLocationId, setSelectedLocationId] = useState(''); // State for selected location ID
  const [selectedTown, setSelectedTown] = useState('');

  const handleOpenAddServiceModal = () => setAddServiceModalOpen(true);
  const handleCloseAddServiceModal = () => setAddServiceModalOpen(false);

  const handleWasteTypeChange = (event) => {
    setSelectedWasteType(event.target.value);
  };

  const handleLocationChange = (event) => {
    setSelectedTown(event.target.value);
  };

    const handleAddServiceSubmit = (modalProps) => {
      console.log("modalProps:", modalProps); // Log modalProps for inspection
      // ... (existing code)
    
      const newService = {
        waste_type: modalProps.wasteType, // Ensure correct property name (wasteType)
        town: modalProps.town, // Ensure correct property name (town)
      };
    
      const convertService = {
        waste_type: modalProps.wasteType,
        location_id: townToId(modalProps.town),
      };
    setAddedServices([...addedServices, convertService]); 
    setServices([...services, newService]);
    console.log("newService", newService);
  }
  useEffect(() => {
    const fetchServices = async () => {
      if (isLoggedIn) {
        try {
          const url = `${backendUrl}/api/provider/service`;
          const response = await axios.post(url, { id: userProfile.id });
  const record = response.data;

          // Check if response.data is an array before applying map
          if (Array.isArray(record)) {
            const servicesWithTownNames = record.map((service) => ({
              ...service,
              town: idToTown(service.location_id), // Convert location_id to town name
            }));
            setServices(servicesWithTownNames);
          } else {
            // Handle non-array response (e.g., log a message or display an error)
            console.log('Received unexpected response format:', response.data);
          }
        } catch (error) {
          console.error('Error fetching services:', error);
          // Handle errors appropriately (e.g., display an error message)
        }
      }
    };
    fetchServices();
  }, [isLoggedIn, userProfile]);
  
  


  const handleDeleteService = (service) => {
    if (window.confirm('Are you sure you want to delete this service option?')) {
      setDeletedServices([...deletedServices, service]); // Add to deleted services
      setServices(services.filter((item) => item !== service)); // Remove from displayed list immediately
    }
  };

 

  const handleConfirmChanges = async () => {
    if (addedServices.length === 0 && deletedServices.length === 0) {
      alert('No changes to confirm.');
      return;
    }

    const formattedAddedServices = addedServices.map((service) => ({
      wastes_type: service.waste_type,
      location_id: service.location_id,
    }));
    const formattedDeletedServices = deletedServices.map((service) => ({
      wastes_type: service.waste_type,
      location_id: service.location_id,
    }));
    const deleteurl = `${backendUrl}/api/provider/service/delete`;
    const addurl = `${backendUrl}/api/provider/service/add`;
    // Replace with your actual API calls for deletions and additions
    const deletePromise = axios.post(deleteurl, {id: userProfile.id, service: formattedDeletedServices});
    const addPromise = axios.post(addurl, {id: userProfile.id, service: formattedAddedServices});
   

    
      setAddedServices([]);
      setDeletedServices([]);
      // Update displayed services if needed (considering backend updates)
    // Display success message
    document.getElementById('confirmation-message').textContent = 'Update the change Successfully!';
  };


return (
    <div>
      <h2>My Service Offerings</h2>

      {/* Display existing services */}
      <ul>
        {services.map((service) => (
          <li key={`${service.waste_type}-${service.town}`}>
            {service.waste_type} - {service.town} (
            <button onClick={() => handleDeleteService(service)}>Delete</button>
            )
          </li>
          
        ))}
      </ul>

      <button onClick={handleOpenAddServiceModal}>Add Service</button>

      {addServiceModalOpen && (
  <AddServiceModal
    wasteTypes={wasteTypes} // Assuming you have a wasteTypes array
    towns={towns} // Assuming you have a towns array
    onSubmit={handleAddServiceSubmit}
    onClose={handleCloseAddServiceModal}
    selectedWasteType={selectedWasteType} // Pass initial waste type (optional)
    selectedTown={selectedTown} // Pass initial town (optional)
  />
      )}

      <button onClick={handleConfirmChanges}>Confirm Changes</button>
      {/* Placeholder for potential success or error message */}
      <div id="confirmation-message"></div>
      <button onClick={() => navigate('/provider')}>Return to Dashboard</button>
    </div>
  );
};


export default ServiceOfferPage;

