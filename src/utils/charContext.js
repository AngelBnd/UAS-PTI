import { createContext, useContext, useState } from "react";

const CharacterContext = createContext();

export const useChar = () => useContext(CharacterContext);

export const CharacterProvider = ({ children }) => {
    const [selectedChar, updateSelectedChar] = useState(1);
    const [playerName, setPlayerName] = useState('');

    return (
        <CharacterContext.Provider value = {{ selectedChar, updateSelectedChar, playerName, setPlayerName }}>
            {children}
        </CharacterContext.Provider>
    );
};