import kaatiBG from '../../assets/KaatiBG.png';
import { useMovementMain } from '../../utils/useMovementMain';
import { useUpdateMovement } from '../../utils/useUpdateMovement';
import './PixelArt.css'
import { useRef, useState, useEffect } from 'react';
import fullBod1 from '../../assets/fullbod1.png';
import fullBod2 from '../../assets/fullbod2.png';
import fullBod3 from '../../assets/fullbod3.png';
import { useStats } from '../../utils/statsContext';
import { LocationInfosKaati } from '../../data/locationsKaati';
import handlePickUpItem from '../../utils/pickUp';

const fullbods = [fullBod1, fullBod2];
const items = [];
let cool = 0 , showed = 0, holderofindexJ = 0, holderofindexI = 0, collidedLocation, collidedItem;
const collisionInfos = {cool, showed, holderofindexI, holderofindexJ, collidedLocation, collidedItem};
const collidableObjects = [LocationInfosKaati,items];

export default function KaatiArena({setLocation,direction}){
    const[velocity, setVelocity] = useState({x:0,y:0});
    const playerRef = useRef(null);
    const locationRefs = useRef([]);
    const itemRefs = useRef([]);
    const mothership = 1;
    const collidableObjectsRefs = [locationRefs, itemRefs];
    const[showButton, setShowButton] = useState(false);
    const { playerStats, setStats } = useStats();
    
    useMovementMain(setVelocity,direction);
    useUpdateMovement(setVelocity, playerRef, velocity, mothership, collidableObjects, collidableObjectsRefs, collisionInfos);

    useEffect(() => {
        setShowButton(collisionInfos.cool);
    }, [collisionInfos.cool]);

    return(
        <div>
            <img  
            src={kaatiBG}
            className="pixel-art"
            style={{
                position: 'absolute',
                objectFit: 'cover',
                zIndex: '-2',
                width: '80%',
                height: '80%',
                top: '145px',
                left: '0',
            }}
            />

            <div id="player" className='pixel-art' ref={playerRef}
            style ={{
                position: 'absolute',
                top: '530px',
                left: '30px',
                width: '50px',
                height: '70px',
            }}>
                <img id="playerimg" src={fullbods[1]}
                style={{
                    width :'50px',
                    height :'auto',
                }}/>


                {showButton && collisionInfos.collidedLocation && collisionInfos.collidedLocation.functions?.map((func,i) => (
                    <button
                    key={i}
                        style={{
                        position: 'absolute',
                        width : '60px',
                        height : 'auto',
                        left : '50%',
                        top: '-10%',
                        backgroundColor : '#0D061F',
                        color : '#ffdba2',
                        border : 'solid 1.5px #ffdba2',
                        padding : '1px',
                        zIndex :'10000',
                        fontSize : '0.3em',
                        pointerEvents: 'auto'
                        }}
                        onClick={() => {
                            if (collisionInfos.holderofindexI === 0) {
                                if (collisionInfos.collidedLocation.name === "goback") {
                                func(setLocation); 
                                } else {
                                func(setStats); 
                                }
                            } else {
                                handlePickUpItem();
                            }
                            }}
                        >
                        {
                        collisionInfos.holderofindexI === 1
                            ? `Pick up ${collisionInfos.collidedItem.name}`
                            : `${collisionInfos.collidedLocation.activities}`
                        }
                    </button>
                
                ))}

            </div>

        {LocationInfosKaati.map((location, i) => (
            <div className='d-flex flex-column'
            style={{
                position: 'absolute',
                left: `${location.offSets.left}px`,
                top: `${location.offSets.top}px`,
                zIndex :'7',
                width: `${location.widthImg}px`,
                height: `${location.heightImg}px`,

            }}>

            <img
            key={i}
            src={location.element}
            ref={(el)=> (locationRefs.current[i] = el)}
            className={`pixel-art ${location.classNamee}`}
            style={{
                position: 'relative',
                width : `${location.widthImg}px`,
                height : `${location.heightImg}px`,
                zIndex :'1',
            }}
            />
                
            </div>
            ))}
        </div>
    )
}