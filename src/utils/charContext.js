import { createContext, useContext, useState, useRef } from "react";

const CharacterContext = createContext();
export const useChar = () => useContext(CharacterContext);

export const CharacterProvider = ({ children }) => {
  const [selectedChar, updateSelectedChar] = useState(1);
  const [playerName, setPlayerName] = useState('');
  const [playerPosition, setPlayerPosition] = useState({ x: 50, y: 50 });

  // Player position references
  const playerPositionRef = useRef({
    x: 600,
    y: 250,
    screenX: 600,
    screenY: 250
  });

  // Player DOM reference
  const playerRef = useRef(null);

  // Planet data
  const [planets] = useState([
    { id: 1, x: 30, y: 20, name: "Ejwa" },
    { id: 2, x: 60, y: 25, name: "Kaati" },
    { id: 3, x: 45, y: 50, name: "Solez" },
    { id: 4, x: 55, y: 60, name: "Sugma" },
    { id: 5, x: 35, y: 50, name: "Mothership" }
  ]);

  // Items data
  const [items, setItems] = useState([
    { id: 1, x: 40, y: 50, type: "cola" },
    { id: 2, x: 60, y: 30, type: "medkit" },
    { id: 3, x: 50, y: 40, type: "aircan" },
    { id: 4, x: 70, y: 60, type: "choco" },
    { id: 5, x: 20, y: 30, type: "coffee" },
    { id: 6, x: 80, y: 45, type: "donut" }
  ]);

  // Update player position in both pixels and percentages
  const updatePlayerPosition = (pixelPos) => {
    playerPositionRef.current = { 
      ...playerPositionRef.current,
      x: pixelPos.x,
      y: pixelPos.y
    };
    setPlayerPosition({
      x: (pixelPos.x / 1200) * 100,
      y: (pixelPos.y / 600) * 100
    });
  };

  return (
    <CharacterContext.Provider value={{
      // Character selection
      selectedChar,
      updateSelectedChar,
      
      // Player info
      playerName,
      setPlayerName,
      
      // Position tracking
      playerPosition,
      playerPositionRef,
      updatePlayerPosition,
      playerRef,
      
      // Game objects
      planets,
      items,
      setItems
    }}>
      {children}
    </CharacterContext.Provider>
  );
};