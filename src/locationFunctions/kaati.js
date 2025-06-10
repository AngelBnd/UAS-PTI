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
import { useEffect } from "react";

export function kaati1(setStats,setResources,resources,setMessageContent,setMessageTrigger,setItemsInInventory,ItemsInInventory,whatItemToSell,howMuchTheItem) {
    
    let neededResources = resources - 50;
    if(neededResources<0){
        setMessageContent(`Need ${Math.abs(neededResources)} more resources!`);
        setMessageTrigger(prev=>prev+1);
        return;
    }

    const takeOrGive = Math.floor(Math.random() * 11);
    const randomAmount = Math.floor(Math.random() * 80-20) + 20;
    if(takeOrGive<=5){
        setResources((prev)=>prev-randomAmount)
    } else {
        setResources((prev)=>prev+randomAmount)
    }
} //GAMBLING

export function kaati2(setStats,setResources,resources,setMessageContent,setMessageTrigger,setItemsInInventory,ItemsInInventory,whatItemToSell,howMuchTheItem) {
    let boughtItem; 
    switch (whatItemToSell) {
        case 1:
            boughtItem = new ItemInfo("coffee", 7, coffee, coffeeFunc,"item", 40, 57, { left: 650, top: 40 });
            break;
        case 2:
            boughtItem = new ItemInfo("tea", 8, tea, teaFunc,"item", 40, 57, { left: 700, top: 40 });
            break;
        case 3:
            boughtItem = new ItemInfo("soda", 9, soda, sodaFunc,"item", 40, 57, { left: 850, top: 60 });
            break;
        case 4:
            boughtItem = new ItemInfo("donut", 6, donut, donutFunc,"item", 60, 60, { left: 570, top: 100 });
            break;
        case 5:
            boughtItem =new ItemInfo("chocolate", 5, choco, chocoFunc,"item", 60, 60, { left: 270, top: 100 });
            break;
        default:
            
            break;
    }

    console.log(`uuuu${howMuchTheItem}`);
    console.log(`uuuu2${resources}`);

    let neededResources = resources - howMuchTheItem;

    if(neededResources<0){
        setMessageContent(`Need ${Math.abs(neededResources)} more resources!`);
        setMessageTrigger(prev=>prev+1);
        return;
    }

    if(ItemsInInventory.length==6){
        setMessageContent("Your inventory is full!");
        setMessageTrigger(prev=>prev+1);
        return;
    }

    while (ItemsInInventory.some(item => item.id === boughtItem.id)) boughtItem.id++;
    setResources((prev)=>prev-howMuchTheItem)
    setItemsInInventory(prev => [...prev, boughtItem ]);
} // TRADE
