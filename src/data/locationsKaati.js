import { LocationInfo } from "../models/LocationInfo";
import gobackimage from '../assets/gobackmothership.png'
import { goback } from "../locationFunctions/rockethome";
import kaati1 from '../assets/kaati1.png'
import kaati2 from '../assets/kaati2.png'

//name, element, classNamee, functions, activities name, duration for each activity, widthImg, heightImg, { left, top }

export const LocationInfosKaati = [
    new LocationInfo(
        "",
        kaati2,
        "tradingarea",
        [],
        "Trade",
        0,
        200, 
        100, 
        {left : 330, top : 550}
    ),
    new LocationInfo(
        "gambling",
        kaati1, 
        "gambling",
        [],
        "Gamble with locals", 
        7200,
        350, 
        100, 
        {left : 750, top : 550},
    ),
    new LocationInfo(
        "goback",
        gobackimage,
        "gobackimage",
        [goback],
        ["Go back"],
        0,
        100, 
        100, 
        {left : 0, top : 550}
    ),
 
];