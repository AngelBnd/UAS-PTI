import { LocationInfo } from "../models/LocationInfo";
import gobackimage from '../assets/gobackmothership.png'
import { goback } from "../locationFunctions/rockethome";
import ejwa1image from '../assets/ejwa1.png'
import ejwa2image from '../assets/ejwa2.png'
import homerocket from '../assets/rocketTOHOME.png';

//name, element, classNamee, functions, activities name, duration for each activity, widthImg, heightImg, { left, top }

export const LocationInfosEjwa = [
    new LocationInfo(
        "",
        ejwa1image,
        "tradingarea",
        [],
        "Analyze Gas Composition",
        0,
        200, 
        100, 
        {left : 160, top : 480}
    ),
    new LocationInfo(
        "",
        ejwa2image, 
        "searchAlien",
        [],
        "Search for Alien Tech", 
        7200,
        200, 
        100, 
        {left : 870, top : 480},
    ),
    new LocationInfo(
        "goback",
        homerocket,
        "gobackimage",
        [goback],
        ["Go back"],
        0,
        200, 
        200, 
        {left : 520, top : 350}
    ),
 
];