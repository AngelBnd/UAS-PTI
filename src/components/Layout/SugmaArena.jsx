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
import { useTime } from '../../utils/timeContext';
import activityFunc from '../../utils/activityFunc';
import ActiProgressBar from './ActiProgressBar';
import './AAResponsiveness.css';
import { useChar } from '../../utils/charContext';
import './ActivityAnimate.css';

const fullbods = [fullBod1, fullBod2, fullBod3];
const items = [];
let cool = 0 , showed = 0, holderofindexJ = 0, holderofindexI = 0, collidedLocation, collidedItem;
const collisionInfos = {cool, showed, holderofindexI, holderofindexJ, collidedLocation, collidedItem};
const collidableObjects = [LocationInfosSugma,items];

export default function SugmaArena({setActivitiesDone,setLocation,direction}){
    const[velocity, setVelocity] = useState({x:0,y:0});
    const playerRef = useRef(null);
    const locationRefs = useRef([]);
    const itemRefs = useRef([]);
    const cameraRef = useRef(null); 
    const mothership = 0;
    const collidableObjectsRefs = [locationRefs, itemRefs];
    const[showButton, setShowButton] = useState(false);
    const { playerStats, setStats } = useStats();

    const { selectedChar, playerName } = useChar();
    const charFullbody = selectedChar - 1;

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


    useMovementMain(setVelocity,direction,movementLock);
    useUpdateMovement(setVelocity, playerRef, velocity, mothership, collidableObjects, collidableObjectsRefs, collisionInfos);

    // useEffect(() => {
    //     if (activityMsg) {
    //         const timer = setTimeout(() => updActivityMsg(''), 2000);
    //         return () => clearTimeout(timer);
    //     }
    // }, [activityMsg]);

    useEffect(() => {
        if (doingActivity) setMovementLock(true);
        else setMovementLock(false);
    }, [doingActivity]);

    useEffect(() => {
        setShowButton(collisionInfos.cool);
    }, [collisionInfos.cool]);

    useEffect(() => {
        activityFunc(timeSpeed,didMountRef,timeoutRef,intervalRef,ActivityFunc,setActivityFunc,setDoingActivity,setTime,setDay,skipActivityRef,setStats,setActiProgress,actiDuration,setVelocity,setMovementLock);
        return()=>{
            clearInterval(intervalRef.current);
            clearTimeout(timeoutRef.current);

        };

    }, [ActivityFunc]);



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

            <div id="player" className="pixel-art" ref={playerRef}
            style ={{
                position: 'absolute',
                top: '445px',
                left: '570px',
                width: '50px',
                height: '50px',
            }}>
                <img id="playerimg" className={`${doingActivity ? 'is-oscillating' : ''}`} src={fullbods[charFullbody]}/>
                
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
                        top: `${-35 + i * 40}%`,
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
                            if (collisionInfos.collidedLocation.name === 'Rockethome') {
                                func(setLocation);
                            } else {
                                setActivitiesDone(prev=>prev+1);
                                setDoingActivity(true);
                                setActivityFunc(() => () => func(setStats));
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
                                top: '80%',
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