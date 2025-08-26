// src/components/FlipUnit.jsx
import { useEffect, useState } from 'react';
import './FlipUnit.css';

const FlipUnit = ({ digit }) => {
  const [previousDigit, setPreviousDigit] = useState(digit);
  const [flipping, setFlipping] = useState(false);

  useEffect(() => {
    if (digit !== previousDigit) {
      setFlipping(true);
      const timeout = setTimeout(() => {
        setPreviousDigit(digit);
        setFlipping(false);
      }, 600);
      return () => clearTimeout(timeout);
    }
  }, [digit, previousDigit]);

  return (
    <div className="flip-unit-container">
      <div className="upper-card">{previousDigit}</div>
      <div className="lower-card">{digit}</div>

      <div className={`flip-card first ${flipping ? 'flip' : ''}`}>
        <div className="flip-card-front">{previousDigit}</div>
        <div className="flip-card-back">{digit}</div>
      </div>

      <div className={`flip-card second ${flipping ? 'flip' : ''}`}>
        <div className="flip-card-front">{previousDigit}</div>
        <div className="flip-card-back">{digit}</div>
      </div>
    </div>
  );
};

export default FlipUnit;
