import { LocationInfo } from "../models/LocationInfo";
import sugma1image from '../assets/sugma1.png';
import sugma2image from '../assets/sugma2.png';
import sugma3image from '../assets/sugma3.png';
import sugma4image from '../assets/sugma4.png';
import homerocket from '../assets/rocketTOHOME.png';
import { sugma1,sugma2,sugma3 } from "../locationFunctions/sugma";
import { goback } from "../locationFunctions/rockethome";
import { GuessNumberGameComponent, sugma41, sugma42 } from "../locationFunctions/sugmagame"
import { game31,game32 } from "../locationFunctions/gamesugma3";
import { InfoSugma } from "../locationFunctions/sugma";

//name, element, classNamee, functions, activities, widthImg, heightImg, { left, top 
export const LocationInfosSugma = [
  new LocationInfo(
    "Sugma1",
    sugma1image,
    "sugma1",
    [sugma1, sugma2],
    ["eugh", "augh"],
    100,
    100,
    { left: 100, top: 220 },
    "Pada zaman dahulu"
  ),
  new LocationInfo(
    "Sugma2",
    sugma2image,
    "sugma2",
    [sugma41, sugma42],
    ["Mulai Game"],
    100,
    100,
    { left: 180, top: 580 },
    "Deskripsi Sugma2"
  ),
  new LocationInfo(
    "Sugma3",
    sugma3image,
    "sugma3",
    [game31, game32],
    ["uewu", "aewe"],
    100,
    100,
    { left: 980, top: 240 },
    "Deskripsi Sugma3"
  ),
  new LocationInfo(
    "Sugma4",
    sugma4image,
    "sugma4",
    [],
    [],
    100,
    100,
    { left: 920, top: 600 },
    "Deskripsi Sugma4"
  ),
  new LocationInfo(
    "Rockethome",
    homerocket,
    "rockethome",
    [goback],
    ["Go back"],
    120,
    120,
    { left: 550, top: 370 },
    "Deskripsi Rockethome"
  )
  
];
