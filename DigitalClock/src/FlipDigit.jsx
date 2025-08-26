// src/components/FlipDigit.jsx
import { useEffect, useState } from 'react';
import './FlipDigit.css';

const FlipDigit = ({ value }) => {
  const [previousValue, setPreviousValue] = useState(value);
  const [flipping, setFlipping] = useState(false);

  useEffect(() => {
    if (value !== previousValue) {
      setFlipping(true);
      const timeout = setTimeout(() => {
        setPreviousValue(value);
        setFlipping(false);
      }, 600);
      return () => clearTimeout(timeout);
    }
  }, [value, previousValue]);

  return (
    <div className="flip-digit">
      <div className={`upper`}>{previousValue}</div>
      <div className={`lower`}>{value}</div>
      <div className={`flip ${flipping ? 'animate' : ''}`}>
        <div className="flip-upper">{previousValue}</div>
        <div className="flip-lower">{value}</div>
      </div>
    </div>
  );
};

export default FlipDigit;
