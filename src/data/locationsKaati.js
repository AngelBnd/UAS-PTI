import { LocationInfo } from "../models/LocationInfo";
import gobackimage from '../assets/gobackmothership.png'
import { goback } from "../locationFunctions/rockethome";
import kaati1image from '../assets/kaati1.png'
import kaati2image from '../assets/kaati2.png'
import homerocket from '../assets/rocketTOHOME.png';
import { kaati1, kaati2 } from "../locationFunctions/kaati";

//name, element, classNamee, functions, activities name, duration for each activity, widthImg, heightImg, { left, top }

export const LocationInfosKaati = [
    new LocationInfo(
        "trade",
        kaati2image,
        "tradingarea",
        [kaati2],
        ["Trade"],
        [1200],
        100, 
        100, 
        {left : 430, top : 550}
    ),
    new LocationInfo(
        "gambling",
        kaati1image, 
        "gambling",
        [kaati1],
        ["Gamble with locals"], 
        [1200],
        350, 
        100, 
        {left : 750, top : 550},
    ),
    new LocationInfo(
        "goback",
        homerocket,
        "gobackimage",
        [goback],
        ["Go back"],
        0,
        300, 
        300, 
        {left : -150, top : 350}
    ),
 
];