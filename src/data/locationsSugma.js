import { LocationInfo } from "../models/LocationInfo";
import sugma1image from '../assets/sugma1.png';
import sugma2image from '../assets/sugma2.png';
import sugma3image from '../assets/sugma3.png';
import sugma4image from '../assets/sugma4.png';
import homerocket from '../assets/rocketTOHOME.png';
import { sugma1,sugma2,sugma3, sugma4, sugma5, sugma6, sugma7, sugma8, sugma9 } from "../locationFunctions/sugma";
import { goback } from "../locationFunctions/rockethome";
import { GuessNumberGameComponent, sugma41, sugma42 } from "../locationFunctions/sugmagame"
import { game31,game32 } from "../locationFunctions/gamesugma3";
import { InfoSugma } from "../locationFunctions/sugma";
import { sugmaGameQA } from "../locationFunctions/sugmagame";

//name, element, classNamee, functions, activities name, duration for each activity(7200,6000,4800,3600,), widthImg, heightImg, { left, top }

export const LocationInfosSugma = [
    new LocationInfo(
        "Sugma1",
        sugma1image, 
        "sugma1",
        [sugma1,sugma2,sugma3],
        ["Oxygen Surge","Deep Breather","Hyper Intake"], 
        [6000,4800,3600],
        150, 
        100, 
        {left : 250, top : 220},
    ),
    new LocationInfo(
        "Sugma2",
        sugma2image,
        "sugma2",
        [sugma4, sugma5, sugma6],
        ["Harvest Vapors","Refine Gas Pods","Overwork Shift"],
        [4800, 6000, 3600],
        220, 
        100, 
        {left : 600, top : 580}
    ),
    new LocationInfo(
        "Sugma3",
        sugma3image,
        "sugma3",
        [sugma7, sugma8, sugma9],
        ["Storm Exposure","Gas Meditation","Pressure Trial"],
        [3600, 4800, 6000],
        100, 
        190, 
        {left : 980, top : 240}
    ),
        new LocationInfo(
        "Rockethome",
        homerocket, 
        "rockethome",
        [goback],
        ["Go back"],
        [],
        120, 
        120, 
        {left : 550, top : 300}
    )
];
