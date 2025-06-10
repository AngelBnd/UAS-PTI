import React, { useContext, useState, createContext } from "react";
const inventoryContext = createContext();

export const useInventory = () => useContext(inventoryContext);

export const InventoryProvider = ({ children }) => {
    const [ itemsInInventory, setItemsInInventory ] = useState([]);

    const value = {
        itemsInInventory,
        setItemsInInventory
    };

    return (
        <inventoryContext.Provider value={value}>
            {children}
        </inventoryContext.Provider>
    );
}