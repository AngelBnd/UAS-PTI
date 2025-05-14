import { LocationInfo } from "../models/LocationInfo";

import planet1 from '../assets/planet1.png';
import planet2 from '../assets/planet2.png';
import planet3 from '../assets/planet3.png';
import planet4 from '../assets/planet4.png';
import mothership from '../assets/mothership.png';

export const LocationInfosMain = [
    new LocationInfo(
        "Ejwa",
        planet1, 
        "planet1",
        500, 
        500, 
        3,
        {left : -500, top : 280}
    ),
    new LocationInfo(
        "Solez",
        planet2,
        "planet2",
        384, 
        384, 
        2,
        {left : 1250, top : 370}
    ),
    new LocationInfo(
        "Sugma",
        planet3,
        "planet3",
        384, 
        354, 
        2,
        {left : -200, top : -220}
    ),
    new LocationInfo(
        "Kaati",
        planet4,
        "planet4",
        160, 
        160, 
        2,
        {left : 1200, top : -150}
    ),
        new LocationInfo(
        "Mothership",
        mothership, 
        "mothership",
        200, 
        190, 
        2,
        {left : 500, top : 200}
    )
];
