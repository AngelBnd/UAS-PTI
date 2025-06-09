import ItemInInventory from './ItemInInventory';
import './Chest.css';

export default function ChestUI({
    playerInventory,
    setPlayerInventory,
    activeChestId,
    allLocations,
    setAllLocations,
    setIsChestOpen,
    setMovementLock
}) {
    
    const activeChest = allLocations.find(loc => loc.name === activeChestId);
    const handleClose = () => {
        setIsChestOpen(false);
        setMovementLock(false);
    }

    const handleStoreItem = (itemToStore) => {
        setPlayerInventory(prev => prev.filter(item => item.id !== itemToStore.id));
        setAllLocations(prevLocations =>
            prevLocations.map(loc => 
                loc.name === activeChestId
                    ? {...loc, inventory: [...loc.inventory, itemToStore]}
                    : loc
            )
        );
    };

    const handleTakeItem = (itemToTake) => {
        setAllLocations(prevLocations =>
            prevLocations.map(loc => 
                loc.name === activeChestId
                    ? {...loc, inventory: loc.inventory.filter(item => item.id !== itemToTake.id)}
                    : loc
            )
        );

        setPlayerInventory(prev => [...prev, itemToTake]);
    }

    if(!activeChest) return null;

    return (
        <div className="chest-container">

            <button onClick={handleClose} className="chest-close-button">X</button>

            <div className="inventories-wrapper">
                
                <div className="inventory-panel">
                    <p>Your Inv</p>
                    <div className="item-list">
                        {(playerInventory || []).map(item => (
                            <ItemInInventory
                                key={item.id}
                                item={item}
                                onItemClick={() => handleStoreItem(item)}
                            />
                        ))}
                    </div>
                </div>

                <div className="inventory-panel">
                    <p>Chest</p>
                    <div className="item-list">
                        {activeChest.inventory.map(item => (
                            <ItemInInventory
                                key={item.id}
                                item={item}
                                onItemClick={() => handleTakeItem(item)}
                            />
                        ))}
                    </div>
                </div>
            </div>
            
        </div>
    );

}