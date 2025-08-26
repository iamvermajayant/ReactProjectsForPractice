// src/components/FlipClock.jsx
import { useEffect, useState } from 'react';
import FlipUnit from './FlipUnit';
import './FlipUnit.css';

const pad = (n) => n.toString().padStart(2, '0');

const FlipClock = () => {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const interval = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(interval);
  }, []);

  const hours = pad(time.getHours());
  const minutes = pad(time.getMinutes());
  const seconds = pad(time.getSeconds());

  return (
    <div className="flip-clock">
      {[...hours].map((d, i) => (
        <FlipUnit key={`h${i}`} digit={d} />
      ))}
      <span className="colon">:</span>
      {[...minutes].map((d, i) => (
        <FlipUnit key={`m${i}`} digit={d} />
      ))}
      <span className="colon">:</span>
      {[...seconds].map((d, i) => (
        <FlipUnit key={`s${i}`} digit={d} />
      ))}
    </div>
  );
};

export default FlipClock;
