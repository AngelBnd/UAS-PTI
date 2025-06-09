import mothershipBG from '../../assets/MothershipBG.png';
import { useMovementMain } from '../../utils/useMovementMain';
import { useUpdateMovement } from '../../utils/useUpdateMovement';
import './PixelArt.css'
import { useRef, useState,useEffect } from 'react';
import fullBod1 from '../../assets/fullbod1.png';
import fullBod2 from '../../assets/fullbod2.png';
import fullBod3 from '../../assets/fullbod3.png';
import { LocationInfosMothership } from '../../data/locationsMothership';
import { useStats } from '../../utils/statsContext';
import handlePickUpItem from '../../utils/pickUp';
import { useTime } from '../../utils/timeContext';
import ActiProgressBar from './ActiProgressBar';
import activityFunc from '../../utils/activityFunc';
import { useChar } from '../../utils/charContext';
import { useInventory } from '../../utils/inventoryContext';
import './AAResponsiveness.css';
import ChestUI from './Chest';

const fullbods = [fullBod1, fullBod2, fullBod3];
const items = [];

export default function MothershipArena({setLocation,direction}) {
    const[velocity, setVelocity] = useState({x:0,y:0});
    const playerRef = useRef(null);
    const locationRefs = useRef([]);
    const itemRefs = useRef([]);
    const mothership = 1;
    const collidableObjectsRefs = [locationRefs, itemRefs];
    const[showButton, setShowButton] = useState(false);
    const { playerStats, setStats } = useStats();
    const { selectedChar, playerName } = useChar();
    const { itemsInInventory, setItemsInInventory } = useInventory();

    const charFullbody = selectedChar - 1;

    // Chest stuff
    const [locations, setLocations] = useState(LocationInfosMothership);
    const [chestOpen, setChestOpen] = useState(false);
    const [chestID, setChestID] = useState(null);

    // Moved to here for new modifications
    const [collisionInfos, setCollisionInfos] = useState({
        cool: false,
        showed: false,
        holderofindexI: 0,
        holderofindexJ: 0,
        collidedLocation: null,
        collidedItem: null,
    });
    const collidableObjects = [locations, items];

    const [activityMsg, updActivityMsg] = useState('');
    const { time, timeSpeed, setTime, setDay } = useTime();
    const [ActivityFunc, setActivityFunc] = useState(() => () => {});
    const [doingActivity, setDoingActivity] = useState(false);
    const [actiProgress, setActiProgress] = useState(0);
    const [actiDuration, setActiDuration] = useState(0);
    const [movementLock, setMovementLock] = useState(false);

    const handleSetPlayerInventory = (newInventory) => {
        setItemsInInventory(newInventory);
    };
    
    const intervalRef = useRef(null);
    const timeoutRef = useRef(null);
    const didMountRef = useRef(false); // this is to prevent the useeffect from the first render
    const skipActivityRef = useRef(false);
    
    useMovementMain(setVelocity, direction, movementLock);
    useUpdateMovement(setVelocity, playerRef, velocity, mothership, collidableObjects, collidableObjectsRefs, collisionInfos, setCollisionInfos);
    
    useEffect(() => {
        if (doingActivity || chestOpen) setMovementLock(true);
        else setMovementLock(false);
    }, [doingActivity, chestOpen]);

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

    return (
    <div>
        <img
            src={mothershipBG}
            className="pixel-art mothershipImg"
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
            style={{
                position: 'absolute',
                top: '530px',
                left: '30px',
                width: '50px',
                height: '70px',
            }}>
            <img id="playerimg" src={fullbods[charFullbody]}
                style={{
                    width: '50px',
                    height: 'auto',
                }} />

        <>
            {showButton && !chestOpen && collisionInfos.collidedLocation && (
                <>
                    {collisionInfos.collidedLocation.type === 'chest' ? (
                        <button
                            className="chest-button"
                            style={{
                                position: 'absolute',
                                width: '4rem',
                                height: 'auto',
                                left: '55%',
                                top: '-10%',
                                backgroundColor: '#0D061F',
                                color: '#ffdba2',
                                border: 'solid 1.5px #ffdba2',
                                padding: '4px 1px',
                                zIndex: '10000',
                                fontSize: '0.3em',
                                pointerEvents: 'auto',
                            }}
                            onClick={() => {
                                setChestID(collisionInfos.collidedLocation.name);
                                setChestOpen(true);
                                setShowButton(false);
                            }}
                        >
                            Open Chest
                        </button>
                    ) : (
                        collisionInfos.collidedLocation.functions?.map((func, i) => (
                            <button
                                key={collisionInfos.collidedLocation.name + i}
                                style={{
                                    position: 'absolute',
                                    width: '4rem',
                                    height: 'auto',
                                    left: '55%',
                                    top: '-10%',
                                    backgroundColor: '#0D061F',
                                    color: '#ffdba2',
                                    border: 'solid 1.5px #ffdba2',
                                    padding: '3px 1px',
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
                                            setActivityFunc(() => () => func(setStats));
                                            setActiDuration(collisionInfos.collidedLocation.actDuration[i]);
                                        }
                                    } else {
                                        // handlePickUpItem();
                                    }
                                }}
                            >
                                {collisionInfos.holderofindexI === 1
                                    ? `Pick up ${collisionInfos.collidedItem.name}`
                                    : `${collisionInfos.collidedLocation.activities?.[i]}`}
                            </button>
                        ))
                    )}

                    {doingActivity &&
                        <div>
                            <ActiProgressBar progressPercentage={actiProgress} />
                        </div>
                    }
                    
                    {collisionInfos.holderofindexI === 0 && collisionInfos.collidedLocation.name !== 'goback' && doingActivity && (
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
                                skipActivityRef.current = true;
                            }}
                        >
                            Skip
                        </button>
                    )}
                </>
            )}
        </>

        </div>

        {/* Added chest UI */}
        {chestOpen && (
            <ChestUI
                playerInventory={itemsInInventory}
                setPlayerInventory={handleSetPlayerInventory}
                activeChestId={chestID}
                allLocations={locations}
                setAllLocations={setLocations}
                setIsChestOpen={setChestOpen}
                setMovementLock={setMovementLock}
            />
        )}

        {locations.map((location, i) => (
            <div className='d-flex flex-column'
                style={{
                    position: 'absolute',
                    left: `${location.offSets.left}px`,
                    top: `${location.offSets.top}px`,
                    zIndex: '7',
                    width: `${location.widthImg}px`,
                    height: `${location.heightImg}px`,
                }}>
                <img
                    src={location.element}
                    ref={(el) => (locationRefs.current[i] = el)}
                    className={`pixel-art ${location.classNamee}`}
                    style={{
                        position: 'relative',
                        width: `${location.widthImg}px`,
                        height: `${location.heightImg}px`,
                        zIndex: '1',
                    }}
                />
            </div>
        ))}
    </div>
    );
}