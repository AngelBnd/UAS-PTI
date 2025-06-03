import React, { useState, useEffect } from 'react';
import { LocationInfosSugma } from '../../data/locationsSugma'; 

const InfoSugma = () => {
  const [currentLocation, setCurrentLocation] = useState(null);
  const [messageContent, setMessageContent] = useState('');
  const [messageTrigger, setMessageTrigger] = useState(0);

  const changeLocation = (locationId) => {
    const location = LocationInfosSugma.find(loc => loc.id === locationId);
    if (location) {
      setCurrentLocation(location);
    }
  };

  useEffect(() => {
    if (currentLocation) {
      setMessageContent(`Selamat datang di ${currentLocation.name}!`);
      setMessageTrigger(prev => prev + 1);
    }
  }, [currentLocation]);

  return (
    <div>
      <h1>{messageContent}</h1>
      <div style={{ display: 'flex', gap: 10 }}>
        {LocationInfosSugma.map(location => (
          <button key={location.id} onClick={() => changeLocation(location.id)}>
            {location.name}
          </button>
        ))}
      </div>
    </div>
  );
};

export default InfoSugma;