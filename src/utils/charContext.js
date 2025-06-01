import React, { createContext, useState, useContext } from 'react';

const CharContext = createContext();

export const useChar = () => useContext(CharContext);

export const CharacterProvider = ({ children }) => {
  const [position, setPosition] = useState({ x: 100, y: 100 });

  const locations = [
    {
      name: 'Mothership',
      image: '/assets/mothership.png',
      x: 100,
      y: 100,
    },
    {
      name: 'Planet 1',
      image: '/assets/planet1.png',
      x: 500,
      y: 150,
    },
    {
      name: 'Planet 2',
      image: '/assets/planet2.png',
      x: 900,
      y: 300,
    },
    {
      name: 'Planet 3',
      image: '/assets/planet3.png',
      x: 300,
      y: 600,
    },
    {
      name: 'Planet 4',
      image: '/assets/planet4.png',
      x: 700,
      y: 700,
    },
  ];

  const teleportTo = (x, y) => {
    setPosition({ x, y });
  };

  return (
    <CharContext.Provider value={{ position, teleportTo, locations }}>
      {children}
    </CharContext.Provider>
  );
};
