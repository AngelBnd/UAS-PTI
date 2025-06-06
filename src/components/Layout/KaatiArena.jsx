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
import { useTime } from '../../utils/timeContext';
import ActiProgressBar from './ActiProgressBar';
import activityFunc from '../../utils/activityFunc';
import { items } from '../../data/itemsOnMap';
import TradeInfo from '../../TradeInfo';
import GambleInfo from '../../GambleInfo';

const fullbods = [fullBod1, fullBod2];
let cool = 0 , showed = 0, holderofindexJ = 0, holderofindexI = 0, collidedLocation, collidedItem;
const collisionInfos = {cool, showed, holderofindexI, holderofindexJ, collidedLocation, collidedItem};
const collidableObjects = [LocationInfosKaati,items];
let whatItemToSell, howMuchTheItem;

export default function KaatiArena({setLocation,direction, resources, setResources,setMessageContent,setMessageTrigger,setItemsInInventory,ItemsInInventory}){
    const[velocity, setVelocity] = useState({x:0,y:0});
    const playerRef = useRef(null);
    const locationRefs = useRef([]);
    const itemRefs = useRef([]);
    const mothership = 1;
    const collidableObjectsRefs = [locationRefs, itemRefs];
    const[showButton, setShowButton] = useState(false);
    const [showTrade, setShowTrade] = useState(false);
    const [showGamble, setShowGamble] = useState(false);
    const { playerStats, setStats } = useStats();

    const [activityMsg, updActivityMsg] = useState('');
    const { time, timeSpeed, setTime, setDay } = useTime();
    const [ActivityFunc, setActivityFunc] = useState(() => () => {});
    const [doingActivity, setDoingActivity] = useState(false);
    const [actiProgress, setActiProgress] = useState(0);
    const [actiDuration, setActiDuration] = useState(0);
    const [movementLock, setMovementLock] = useState(false);

    const intervalRef = useRef(null);
    const timeoutRef = useRef(null);
    const didMountRef = useRef(false); // this is to prevent the useeffect from the first render
    const skipActivityRef = useRef(false);
    
    useMovementMain(setVelocity,direction, movementLock);
    useUpdateMovement(setVelocity, playerRef, velocity, mothership, collidableObjects, collidableObjectsRefs, collisionInfos);

    useEffect(() => {
        if (doingActivity) setMovementLock(true);
        else setMovementLock(false);
    }, [doingActivity]);

    useEffect(() => {
        setShowButton(collisionInfos.cool);
        if(collisionInfos.collidedLocation?.name === "trade") setShowTrade(true);
        else setShowTrade(false);

        if(collisionInfos.collidedLocation?.name === "gambling") setShowGamble(true);
        else setShowGamble(false);
    }, [collisionInfos.cool]);

    useEffect(() => {
        activityFunc(timeSpeed,didMountRef,timeoutRef,intervalRef,ActivityFunc,setActivityFunc,setDoingActivity,setTime,setDay,skipActivityRef,setStats,setActiProgress,actiDuration,setVelocity,setMovementLock);
        return()=>{
            clearInterval(intervalRef.current);
            clearTimeout(timeoutRef.current);

        };

    }, [ActivityFunc]);

    useEffect(()=>{
        whatItemToSell = Math.floor(Math.random()*5) + 1;
        howMuchTheItem = Math.floor(Math.random()*20) + 7;
    },[]);
    

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

                
<>
            {showButton && collisionInfos.collidedLocation && (
                <>
                {collisionInfos.collidedLocation.functions?.map((func, i) => (
                    <button
                    key={i}
                    style={{
                        position: 'absolute',
                        width: '50px',
                        height: 'auto',
                        left: '55%',
                        top: '-10%',
                        backgroundColor: '#0D061F',
                        color: '#ffdba2',
                        border: 'solid 1.5px #ffdba2',
                        padding: '1px',
                        zIndex: '10000',
                        fontSize: '0.3em',
                        pointerEvents: 'auto',
                    }}
                    onClick={() => {
                        if (collisionInfos.holderofindexI === 0) {
                            if (collisionInfos.collidedLocation.name === 'goback') {
                                func(setLocation);
                            } else {
                                setDoingActivity(true);
                                setActivityFunc(() => () => func(setStats,setResources,resources,setMessageContent,setMessageTrigger,setItemsInInventory,ItemsInInventory,whatItemToSell,howMuchTheItem));
                                console.log(collisionInfos.collidedLocation.actDuration[i]);
                                setActiDuration(collisionInfos.collidedLocation.actDuration[i]);
                            }
                        } else {
                        handlePickUpItem();
                        }
                    }}
                    >
                    {collisionInfos.holderofindexI === 1
                        ? `Pick up ${collisionInfos.collidedItem.name}`
                        : `${collisionInfos.collidedLocation.activities?.[i]}`}
                    </button>
                ))}
                
                {doingActivity && 
                    <div>
                        <ActiProgressBar progressPercentage={actiProgress} />
                    </div>
                }
                
                {collisionInfos.holderofindexI===0 ? (
                    collisionInfos.collidedLocation.name != 'Rockethome' ? (
                        doingActivity ? (
                            <button
                                style={{
                                position: 'absolute',
                                top: '100%',
                                left: '55%',
                                backgroundColor: '#0D061F',
                                color: '#ffdba2',
                                padding: '2px 5px',
                                fontSize: '0.3em',
                                border: 'solid 1.5px #ffdba2',
                                zIndex: '10006',
                                pointerEvents: 'auto',
                                }}
                                onClick={() => {
                                    if(doingActivity){
                                        skipActivityRef.current = true
                                    }                    
                                }}
                            >
                                Skip
                            </button>
                        ) : <> </>
                    ) : <> </>
                ) : <> </>
            }

                
                </>
            
            )}
            </> 

            </div>

        {showTrade && <TradeInfo 
            whatItemToSell={whatItemToSell}
            howMuchTheItem={howMuchTheItem}
        ></TradeInfo>}

        {showGamble && <GambleInfo ></GambleInfo>}
        
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