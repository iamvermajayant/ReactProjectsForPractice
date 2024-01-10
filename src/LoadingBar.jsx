import React, { useState, useEffect } from 'react';
import './LoadingBar.css'; // Your CSS file for LoadingBar styles

const LoadingBar = () => {
  const [progress, setProgress] = useState(0);

  // useEffect(() => {
  //   const interval = setInterval(() => {
  //     // Simulating progress increment
  //     setProgress((prevProgress) => {
  //       if (prevProgress === 100) {
  //         clearInterval(interval);
  //         // Once loading is complete, you may perform additional actions here
  //         return 100;
  //       } else {
  //         return prevProgress + 10
  //       }
  //     });
  //   }, 100); // Change the interval duration as needed

  //   return () => clearInterval(interval);
  // }, []);


  useEffect(() => {
    const interval = setInterval(() => {
      // Simulating progress increment
      setProgress((prevProgress) => {
        const nextProgress = prevProgress + 1; // Change the increment value to 5
        return nextProgress <= 100 ? nextProgress : 100; // Limit progress to maximum 100%
      });
    }, 50); // Change the interval duration as needed

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="loading-bar-container">
      <div className="loading-bar">
        <div
          className="loading-progress"
          style={{ width: `${progress}%` }}
        ></div>
      </div>
      <p>Loading... {progress}%</p>
    </div>
  );
};

export default LoadingBar;
