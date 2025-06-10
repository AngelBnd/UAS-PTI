import { LocationInfo } from "../models/LocationInfo"
import solez1image from '../assets/solez1.png';
import solez2image from '../assets/solez2.png';
import solez3image from '../assets/solez3.png';
import homerocket from '../assets/rocketTOHOME.png';
import { goback } from "../locationFunctions/rockethome";
import { solez1, solez2, solez3, solez4, solez5, solez6, solez7, solez8} from "../locationFunctions/solez";
//name, element, classNamee, functions, activities name, duration for each activity(7200,6000,4800,3600,), widthImg, heightImg, { left, top }

export const LocationInfosSolez = [
    new LocationInfo(
        "Solez1",
        solez1image, 
        "sugma1",
        [solez1, solez3, solez7], // functions 
        ["Mineral Jackpot","Safe Extraction","Prospector's Luck"], // act name
        [3600,2400,3600], // duration
        200, 
        100, 
        {left : 230, top : 250},
    ),
    new LocationInfo(
        "Solez2",
        solez2image,
        "sugma2",
        [solez2, solez4, solez6],
        ["Deep Core Drill","Cave-In Survival","Tectonic Fracture"],
        [4800, 3600, 4800],
        180, 
        190, 
        {left : 300, top : 580}
    ),
    new LocationInfo(
        "Solez3",
        solez3image,
        "sugma3",
        [solez5, solez8],
        ["Crystal Harvest","Miner's Respite"],
        [4800,3600],
        200, 
        170, 
        {left : 800, top : 350}
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
