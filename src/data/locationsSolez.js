import { LocationInfo } from "../models/LocationInfo"
import solez1image from '../assets/solez1.png';
import solez2image from '../assets/solez2.png';
import solez3image from '../assets/solez3.png';
import homerocket from '../assets/rocketTOHOME.png';
import { goback } from "../locationFunctions/rockethome";
//name, element, classNamee, functions, activities name, duration for each activity(7200,6000,4800,3600,), widthImg, heightImg, { left, top }

export const LocationInfosSolez = [
    new LocationInfo(
        "Solez1",
        solez1image, 
        "sugma1",
        [], // functions 
        [], // act name
        [], // duration
        100, 
        100, 
        {left : 280, top : 250},
    ),
    new LocationInfo(
        "Solez2",
        solez2image,
        "sugma2",
        [],
        [],
        [],
        100, 
        100, 
        {left : 370, top : 580}
    ),
    new LocationInfo(
        "Solez3",
        solez3image,
        "sugma3",
        [],
        [],
        [],
        100, 
        100, 
        {left : 870, top : 350}
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
        {left : 550, top : 370}
    )


]
