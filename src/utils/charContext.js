import { createContext, useContext, useState, useRef, useEffect } from "react";

const CharacterContext = createContext();

export const useChar = () => useContext(CharacterContext);

export const CharacterProvider = ({ children }) => {
    const [selectedChar, updateSelectedChar] = useState(1);
    const [playerName, setPlayerName] = useState('');
    
    // Minimap state
    const [playerPosition, setPlayerPosition] = useState({ x: 50, y: 50 });
    const [planets] = useState([
        { id: 1, x: 30, y: 20, name: "Planet A" },
        { id: 2, x: 70, y: 60, name: "Planet B" },
    ]);
    
    // Items state (sync with your existing itemsOnMap)
    const [items, setItems] = useState([]);

    return (
        <CharacterContext.Provider value={{
            selectedChar,
            updateSelectedChar,
            playerName,
            setPlayerName,
            playerPosition,
            setPlayerPosition,
            planets,
            items,
            setItems
        }}>
            {children}
        </CharacterContext.Provider>
    );
};