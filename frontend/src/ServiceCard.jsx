import React from 'react';

function ServiceCard({ service, onDelete, onEdit }) {
  return (
    <li key={service.id}>
      <p>
        Waste Type: {service.wasteType} | Town: {service.town}
      </p>
      
      <button onClick={() => onEdit(service.id)}>Edit</button>
      <button onClick={() => onDelete(service.id)}>Delete</button>
    </li>
  );
}

export default ServiceCard;
