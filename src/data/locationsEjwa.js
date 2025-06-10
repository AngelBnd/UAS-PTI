import { LocationInfo } from "../models/LocationInfo";
import gobackimage from '../assets/gobackmothership.png'
import { goback } from "../locationFunctions/rockethome";
import ejwa1image from '../assets/ejwa1.png'
import ejwa2image from '../assets/ejwa2.png'
import homerocket from '../assets/rocketTOHOME.png';
import { ejwa1, ejwa2,ejwa3,ejwa4,ejwa5,ejwa6 } from "../locationFunctions/ejwa";

//name, element, classNamee, functions, activities name, duration for each activity, widthImg, heightImg, { left, top }

export const LocationInfosEjwa = [
    new LocationInfo(
        "",
        ejwa1image,
        "ejwa1",
        [ejwa1, ejwa2],
        ["Surface Scan","Core Tunnel Dive"],
        [4800,3600],
        200, 
        100, 
        {left : 160, top : 480}
    ),
    new LocationInfo(
        "",
        ejwa2image, 
        "ejwa2",
        [ejwa3, ejwa5],
        ["Gravity Well Harvest","Ring Exploration"], 
        [4800,3600],
        200, 
        100, 
        {left : 870, top : 480},
    ),
    new LocationInfo(
        "Rockethome",
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