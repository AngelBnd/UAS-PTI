import { ItemInfo } from "../models/itemInfo";
import oxygentabung from '../assets/oxygentabung.png';
import bandage from "../assets/bandage.png";
import { useState } from "react";

export const initialItems = [
    new ItemInfo("item1", oxygentabung, "item", 100, 100, { left: 200, top: 200 }),
    new ItemInfo("item2", bandage, "item", 40, 40, { left: 200, top: 600 }),
];



// const [itemInMap, setItemMap] = useState([{
//     name: "smapah", image: "", x, y}])


// const [inventory, setInventory]= useState([])

// inTrigger = (coordinat) =>{

//     const itenget = itemInMap.find(item => item.x = coordinat.x && item.y == coordinat.y)
//     setItemMap(prev => prev.filter(item => item != itenget))
//     setInventory(prev => {...prev, itenget})
    
// }