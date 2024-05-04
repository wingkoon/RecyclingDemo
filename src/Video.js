  import React, { useEffect, useRef } from 'react';

function Video() {
  const videoRef = useRef(null);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.play();
    }
  }, []); // Empty dependency array ensures useEffect runs only once on mount

  return (
    <div className="video-player">
      <video ref={videoRef} controls width="640" height="480">
        <source src="Recycling.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>
    </div>
  );
}

export default Video;
