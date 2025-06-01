import { createContext, useContext, useState } from "react";

const CharacterContext = createContext();

export const useChar = () => useContext(CharacterContext);

export const CharacterProvider = ({ children }) => {
    const [selectedChar, updateSelectedChar] = useState(1);
    const [playerName, setPlayerName] = useState('');

    // Minimap state
    const [playerPosition, setPlayerPosition] = useState({ x: 50, y: 50 });
    const [currentLocation, setCurrentLocation] = useState('MainArea');

    const [planets] = useState([
        { id: 1, x: 20, y: 30, name: "Planet A", location: "Ejwa" },
        { id: 2, x: 40, y: 50, name: "Planet B", location: "Solez" },
        { id: 3, x: 60, y: 60, name: "Kaati", location: "Kaati" },
        { id: 4, x: 80, y: 40, name: "Sugma", location: "Sugma" },
        { id: 5, x: 50, y: 20, name: "Mothership", location: "Mothership" }
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
            setItems,
            currentLocation,
            setCurrentLocation
        }}>
            {children}
        </CharacterContext.Provider>
    );
};