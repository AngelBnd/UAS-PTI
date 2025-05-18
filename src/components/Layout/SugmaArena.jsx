import sugmaBG from '../../assets/sugmaBG.png';
import { useMovementMain } from '../../utils/useMovementMain';
import { useUpdateMovement } from '../../utils/useUpdateMovement';
import './PixelArt.css'
import { useRef, useState, useEffect } from 'react';
import fullBod1 from '../../assets/fullbod1.png';
import fullBod2 from '../../assets/fullbod2.png';
import fullBod3 from '../../assets/fullbod3.png';
import { LocationInfosSugma } from '../../data/locationsSugma';
import handlePickUpItem from '../../utils/pickUp';
import { useStats } from '../../utils/statsContext';

const fullbods = [fullBod1, fullBod2];
const items = [];
let cool = 0 , showed = 0, holderofindexJ = 0, holderofindexI = 0, collidedLocation, collidedItem;
const collisionInfos = {cool, showed, holderofindexI, holderofindexJ, collidedLocation, collidedItem};
const collidableObjects = [LocationInfosSugma,items];

export default function SugmaArena(){
    const[velocity, setVelocity] = useState({x:0,y:0});
    const playerRef = useRef(null);
    const locationRefs = useRef([]);
    const itemRefs = useRef([]);
    const cameraRef = useRef(null); 
    const mothership = 0;
    const collidableObjectsRefs = [locationRefs, itemRefs];
    const[showButton, setShowButton] = useState(false);
    const { playerStats, setStats } = useStats();

    useMovementMain(setVelocity);
    useUpdateMovement(setVelocity, playerRef, velocity, mothership, collidableObjects, collidableObjectsRefs, collisionInfos);

    useEffect(() => {
        setShowButton(collisionInfos.cool);
    }, [collisionInfos.cool]);

    return(
        <div>
            <img  
            src={sugmaBG}
            className="pixel-art"
            style={{
                position: 'relative',
                objectFit: 'cover',
                zIndex: '-2',
                width: '1500px',
                height: '1500',
                top: '0px',
                left: '0',
            }}
            />

            <div id="player" className='pixel-art' ref={playerRef}
            style ={{
                position: 'absolute',
                top: '445px',
                left: '570px',
                width: '50px',
                height: '50px',
            }}>
                <img id="playerimg" src={fullbods[1]}/>

                {showButton && collisionInfos.collidedLocation.functions?.map((func,i) => (
                    <button
                    key={i}
                        style={{
                        position: 'absolute',
                        width : '50px',
                        height : '13px',
                        left : '50%',
                        top: `${-35 + i * 30}%`,
                        backgroundColor : '#0D061F',
                        color : '#ffdba2',
                        border : 'solid 1.5px #ffdba2',
                        padding : '1px',
                        zIndex :'10000',
                        fontSize : '0.3em',
                        pointerEvents: 'auto'
                        }}
                        onClick={() => {collisionInfos.holderofindexI === 0 ? func(setStats): handlePickUpItem()}}
                        >
                        {
                        collisionInfos.holderofindexI === 1
                            ? `Pick up ${collisionInfos.collidedItem.name}`
                            : `${collisionInfos.collidedLocation.activities?.[i]}`
                        }
                    </button>

                ))}
            </div>

            {LocationInfosSugma.map((location, i) => (
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