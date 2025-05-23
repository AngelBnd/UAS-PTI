export default function handlePickUpItem(collidedItem, collisionInfos, itemRefs, setItemsInInventory, setItemsOnMap){
        const targetItem = collidedItem;

        if(!targetItem)return;

        setItemsInInventory(prevItemsInv => [...prevItemsInv, targetItem]);
        const targetId = targetItem?.id;


        collisionInfos.cool = false;   
        collisionInfos.collidedItem = null;
        collisionInfos.showed = 0;
        

        if (targetId !== undefined) {
            setItemsOnMap((prevItems) => {
                const itemIndex = prevItems.findIndex((item) => item.id === targetId);
                prevItems[itemIndex] = "";
                itemRefs.current[itemIndex] = "";
                return prevItems;
            });
        }
}