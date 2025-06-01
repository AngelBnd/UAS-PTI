import { createContext, useContext, useState, useRef } from "react";

const CharacterContext = createContext();

export const useChar = () => useContext(CharacterContext);

export const CharacterProvider = ({ children }) => {
    const [selectedChar, updateSelectedChar] = useState(1);
    const [playerName, setPlayerName] = useState('');
    
    const [playerPosition, setPlayerPosition] = useState({ x: 50, y: 50 });
    
    const playerPositionRef = useRef({
        x: 600,  
        screenX: 600, 
        screenY: 250
    });

    const [planets] = useState([
        { id: 1, x: 30, y: 20, name: "Planet A" },
        { id: 2, x: 70, y: 60, name: "Planet B" },
    ]);

    const [items, setItems] = useState([
        { id: 1, x: 40, y: 50, type: "cola" },
        { id: 2, x: 60, y: 30, type: "medkit" },
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
            
            planets,
            items,
            setItems
        }}>
            {children}
        </CharacterContext.Provider>
    );
};