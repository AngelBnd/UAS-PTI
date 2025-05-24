import { LocationInfo } from "../models/LocationInfo";

import mothershipbed from '../assets/mothershipbed.png'
import mothershipchest from '../assets/mothershipchest.png'
import gobackimage from '../assets/gobackmothership.png'
import { goback } from "../locationFunctions/rockethome";
import { mothershipBed } from "../locationFunctions/mothership";

export const LocationInfosMothership = [
    new LocationInfo(
        "bed",
        mothershipbed, 
        ["mothershipbed"],
        [mothershipBed],
        "Sleep", 
        350, 
        100, 
        {left : 790, top : 520},
    ),
    new LocationInfo(
        "mothershipchest",
        mothershipchest,
        "mothershipchest",
        [],
        [],
        200, 
        100, 
        {left : 330, top : 550}
    ),
    new LocationInfo(
        "goback",
        gobackimage,
        "gobackimage",
        [goback],
        ["Exit mothership"],
        100, 
        100, 
        {left : 0, top : 550}
    ),
 
];
