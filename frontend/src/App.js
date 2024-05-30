import { useNavigate } from 'react-router-dom'; // For navigation
import React, { useState, useRef } from 'react';
import Login from './Login';
import Video from './Video'; // Assuming Video.js is in a separate file
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
    const avatar = "/recycle.png";
    const [isPlaying, setIsPlaying] = useState(false); // Video playing state
    const logoRef = useRef(null); // Ref to hold logo element
    const navigate = useNavigate(); // Hook for navigation
  
    const handleLogin = () => {
      navigate('/user/login'); // Navigate to /login route on button click
    };
  
    const handleProvider = () => {
      navigate('/provider/login'); // JSX inside functions is not allowed. Render Register conditionally.
    };
  
    const handlePlay = () => {
      setIsPlaying(true);
      logoRef.current.style.display = 'none'; // Hide logo on play
      //logoRef.current.parentElement.style.position = 'relative'; // Set relative positioning on parent
    };
  
    return (
      <div className="App">
        <header className="App-header">
          <div className="profile" ref={logoRef}>
            {isPlaying && <Video />}  {/* Conditionally render Video within logo's parent */}
            <img src={avatar} alt="logo" className="App-logo" /> {/* Hide logo initially */}
          </div>
          <h1>Recycling Made Easy</h1>
          <p>
            Recycling doesn't have to be complicated!<br />
            Our platform helps you understand what can be recycled in your area, <br />
            matches with service providers and simplifies the process.
          </p>
          <div className="buttons">
            <button className="button" onClick={handleLogin}>
              User Login
            </button>
            <button className="button" onClick={handleProvider}>
              Recycling Provider Login
            </button>
            <button className="thumbnail-button" onClick={handlePlay}>
  <span><h2>Why Make This Project?</h2></span>
</button>
          </div>
          {isPlaying && <Video />} {/* Always render the Video component */}
        </header>
      </div>
    );
  }
  
  export default App;
  
  






