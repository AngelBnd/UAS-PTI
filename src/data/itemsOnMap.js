import { ItemInfo } from "../models/itemInfo";
import oxygentabung from '../assets/oxygentabung.png';
import aircan from '../assets/aircan.png';
import water from '../assets/water.png';
import soda from '../assets/soda.png';
import tea from '../assets/tea.png';
import coffee from '../assets/coffee.png';
import donut from '../assets/donut.png';
import choco from '../assets/choco.png';
import syringe from '../assets/syringe.png';
import medkit from '../assets/medkit.png';
import bandage from '../assets/bandage.png';
import { useState } from "react";
import { oxygenTankFunc } from "../utils/itemFunctions";
import { airCanFunc } from "../utils/itemFunctions";
import { waterFunc } from "../utils/itemFunctions";
import { chocoFunc } from "../utils/itemFunctions";
import { donutFunc } from "../utils/itemFunctions";
import { sodaFunc } from "../utils/itemFunctions";
import { coffeeFunc } from "../utils/itemFunctions";
import { teaFunc } from "../utils/itemFunctions";
import { medkitFunc } from "../utils/itemFunctions";
import { bandageFunc } from "../utils/itemFunctions";
import { medicineFunc } from "../utils/itemFunctions";

// name, id, element, func, classNamee, widthImg, heightImg, { left, top }

export const items = [
    new ItemInfo("oxygen tank", 1, oxygentabung, oxygenTankFunc,"item", 100, 100, { left: 200, top: 200 }),
    new ItemInfo("medkit", 2, medkit, medkitFunc,"item", 80, 80, { left: 100, top: 100 }),
    new ItemInfo("bandage", 3, bandage, bandageFunc,"item", 80, 50, { left: 500, top: 80 }),
    new ItemInfo("syringe", 4, syringe, medicineFunc,"item", 80, 80, { left: 360, top: 200 }),
    new ItemInfo("chocolate", 5, choco, chocoFunc,"item", 60, 60, { left: 270, top: 100 }),
    new ItemInfo("donut", 6, donut, donutFunc,"item", 60, 60, { left: 570, top: 80 }),
    new ItemInfo("coffee", 7, coffee, coffeeFunc,"item", 40, 57, { left: 650, top: 40 }),
    new ItemInfo("tea", 8, tea, teaFunc,"item", 40, 57, { left: 700, top: 40 }),
    new ItemInfo("soda", 9, soda, sodaFunc,"item", 40, 57, { left: 850, top: 60 }),
    new ItemInfo("aircan", 10, aircan, airCanFunc,"item", 40, 60, { left: 900, top: 70 }),
    new ItemInfo("water", 11, water, waterFunc,"item", 40, 57, { left: 420, top: 60 }),
];

// const [itemInMap, setItemMap] = useState([{
//     name: "smapah", image: "", x, y}])


// const [inventory, setInventory]= useState([])

// inTrigger = (coordinat) =>{

//     const itenget = itemInMap.find(item => item.x = coordinat.x && item.y == coordinat.y)
//     setItemMap(prev => prev.filter(item => item != itenget))
//     setInventory(prev => {...prev, itenget})
    
// }