import React from 'react';
import './CircularBars.css'; // Your CSS file for styling

const CircularBars = React.memo(({ numberOfBars, radius }) => {
  const bars = [];
  const angleIncrement = (2 * Math.PI) / numberOfBars; // Angle increment to position bars

  for (let i = 0; i < numberOfBars; i++) {
    const angle = i * angleIncrement;
    const x = radius * Math.cos(angle);
    const y = radius * Math.sin(angle);
    const rotation = angle + Math.PI / 2; // Rotate to point towards the center

    bars.push(
      <div
        key={i}
        className="bar"
        style={{
          transform: `translate(${x}px, ${y}px) rotate(${rotation}rad)`,
          animationDuration: `${Math.random() * (0.7 - 0.2) + 0.2}s`,
        }}
      ></div>
    );
  }

  return <div className="circular-bar-container">{bars}</div>;
});

export default CircularBars;