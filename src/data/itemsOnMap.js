import { ItemInfo } from "../models/itemInfo";
import oxygentabung from '../assets/oxygentabung.png';
import { useState } from "react";
import { oxygenTankFunc } from "../utils/itemFunctions";

// name, id, element, func, classNamee, widthImg, heightImg, { left, top }

export const items = [
    new ItemInfo("oxygen tank", 1, oxygentabung, oxygenTankFunc,"item", 100, 100, { left: 200, top: 200 }),
    new ItemInfo("oxygen tank", 2, oxygentabung, oxygenTankFunc,"item", 100, 100, { left: 300, top: 100 }),
    new ItemInfo("oxygen tank", 3, oxygentabung, oxygenTankFunc,"item", 100, 100, { left: 500, top: 80 }),
    new ItemInfo("oxygen tank", 4, oxygentabung, oxygenTankFunc,"item", 100, 100, { left: 360, top: 200 }),
    new ItemInfo("oxygen tank", 5, oxygentabung, oxygenTankFunc,"item", 100, 100, { left: 270, top: 100 }),
    new ItemInfo("oxygen tank", 6, oxygentabung, oxygenTankFunc,"item", 100, 100, { left: 570, top: 80 }),
    new ItemInfo("oxygen tank", 7, oxygentabung, oxygenTankFunc,"item", 100, 100, { left: 650, top: 40 }),
];



// const [itemInMap, setItemMap] = useState([{
//     name: "smapah", image: "", x, y}])


// const [inventory, setInventory]= useState([])

// inTrigger = (coordinat) =>{

//     const itenget = itemInMap.find(item => item.x = coordinat.x && item.y == coordinat.y)
//     setItemMap(prev => prev.filter(item => item != itenget))
//     setInventory(prev => {...prev, itenget})
    
// }