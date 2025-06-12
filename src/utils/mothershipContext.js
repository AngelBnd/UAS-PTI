import { createContext, useContext, useState } from "react";
import { LocationInfosMothership } from "../data/locationsMothership";

const MothershipContext = createContext();

export const useMothership = () => useContext(MothershipContext);

export const MothershipProvider = ({ children }) => {
    const [mothershipLocations, setMothershipLocations] = useState(LocationInfosMothership);

    const value = {
        mothershipLocations,
        setMothershipLocations
    };

    return (
        <MothershipContext.Provider value={value}>
            {children}
        </MothershipContext.Provider>
    );
};