import { createContext, useContext, useState, useRef } from "react";

const CharacterContext = createContext();
export const useChar = () => useContext(CharacterContext);

export const CharacterProvider = ({ children }) => {
  const [selectedChar, updateSelectedChar] = useState(1);
  const [playerName, setPlayerName] = useState('');
  const [playerPosition, setPlayerPosition] = useState({ x: 50, y: 50 });

  // Player position (pixels)
  const playerPositionRef = useRef({
    x: 600,
    screenX: 600,
    screenY: 250
  });

  // Player DOM ref
  const playerRef = useRef(null);

  // Planet data + refs
  const [planets] = useState([
    { id: 1, x: 30, y: 20, name: "Ejwa", ref: useRef(null) },
    { id: 2, x: 60, y: 25, name: "Kaati", ref: useRef(null) },
    { id: 3, x: 45, y: 70, name: "Solez", ref: useRef(null) },
    { id: 4, x: 75, y: 50, name: "Sugma", ref: useRef(null) },
    { id: 5, x: 10, y: 80, name: "Mothership", ref: useRef(null) }
  ]);

  const [items, setItems] = useState([
    { id: 1, x: 40, y: 50, type: "cola", ref: useRef(null) },
    { id: 2, x: 60, y: 30, type: "medkit", ref: useRef(null) },
    { id: 3, x: 50, y: 40, type: "aircan", ref: useRef(null) },
    { id: 4, x: 70, y: 60, type: "choco", ref: useRef(null) },
    { id: 5, x: 20, y: 30, type: "coffee", ref: useRef(null) },
    { id: 6, x: 80, y: 45, type: "donut", ref: useRef(null) }
  ]);

  const updatePlayerPosition = (pixelPos) => {
    const percentagePos = {
      x: (pixelPos.x / 1200) * 100,
      y: (pixelPos.y / 600) * 100
    };
    playerPositionRef.current = { ...pixelPos };
    setPlayerPosition(percentagePos);
  };

  return (
    <CharacterContext.Provider value={{
      selectedChar,
      updateSelectedChar,
      playerName,
      setPlayerName,
      playerPosition,
      playerPositionRef,
      updatePlayerPosition,

      // Tambahan penting:
      playerRef,
      planetRefs: planets.map(p => ({ id: p.id, name: p.name, ref: p.ref })),
      itemRefs: items.map(i => ({ id: i.id, type: i.type, ref: i.ref })),

      // Untuk rendering utama
      planets,
      items,
      setItems
    }}>
      {children}
    </CharacterContext.Provider>
  );
};
