import React, { useState } from 'react';
// Function to manage the schedule input and submission (child component)
const ScheduleInput = ({ match, onSubmit }) => {
    console.log("schedule input is executed");
    const [schedule, setSchedule] = useState('');
    const [scheduleDate, setScheduleDate] = useState(null); // Optional for internal tracking

  
    const handleScheduleChange = (event) => {
        setSchedule(event.target.value);
        // Optionally update scheduleDate here as well
        setScheduleDate(new Date(event.target.value)); // Assuming valid format
      };
    
  
    const handleSubmit = async () => {
      console.log("handle submit is executed");
      if (!schedule) {
        alert('Please enter a schedule');
        return;
      }
      onSubmit(schedule, match, scheduleDate); // Pass schedule and match to parent's onSubmit function
      console.log("match, schedule", match, schedule); // For debugging purposes
    };
  
    return (
      <div>
        <input type="datetime-local" value={schedule} onChange={handleScheduleChange} />
        <button onClick={handleSubmit}>Submit Schedule</button>
      </div>
    );
  };
  
  export default ScheduleInput;