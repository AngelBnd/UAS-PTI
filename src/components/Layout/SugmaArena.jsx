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

const fullbods = [fullBod1, fullBod2];
const items = [];
let cool = 0 , showed = 0, holderofindexJ = 0, holderofindexI = 0, collidedLocation, collidedItem;
const collisionInfos = {cool, showed, holderofindexI, holderofindexJ, collidedLocation, collidedItem};
const collidableObjects = [LocationInfosSugma,items];

export default function SugmaArena({setLocation}){
    const[velocity, setVelocity] = useState({x:0,y:0});
    const playerRef = useRef(null);
    const locationRefs = useRef([]);
    const itemRefs = useRef([]);
    const cameraRef = useRef(null); 
    const mothership = 0;
    const collidableObjectsRefs = [locationRefs, itemRefs];
    const[showButton, setShowButton] = useState(false);
    const { playerStats, setStats } = useStats();

    const [activityMsg, updActivityMsg] = useState('');
    const { time, timeSpeed, setTime } = useTime();
    const [doingActivity, setDoingActivity] = useState(false);
    const [ActivityFunc, setActivityFunc] = useState(null);

    useMovementMain(setVelocity);
    useUpdateMovement(setVelocity, playerRef, velocity, mothership, collidableObjects, collidableObjectsRefs, collisionInfos);

    useEffect(() => {
        if (activityMsg) {
            const timer = setTimeout(() => updActivityMsg(''), 2000);
            return () => clearTimeout(timer);
        }
    }, [activityMsg]);


    useEffect(() => {
        setShowButton(collisionInfos.cool);
    }, [collisionInfos.cool]);

    useEffect(() => {
        if(!doingActivity) return;

        let timer1, timer2, stopTimer2;
            
        timer2 = setInterval(()=>{
            ActivityFunc?.();
        }, 1000);

        timer1 = setTimeout(()=>{
            stopTimer2 = setTimeout(()=>{
                clearInterval(timer2);
                setDoingActivity(false);
            },3000);
        },3000);

        return()=>{
            clearInterval(timer1);
            clearTimeout(stopTimer2);
            clearInterval(timer2);

        };

    }, [doingActivity]);

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
                
                {showButton && collisionInfos.collidedLocation && collisionInfos.collidedLocation.functions?.map((func,i) => (
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
                        onClick={() => {
                            if (collisionInfos.holderofindexI === 0) {
                                if (collisionInfos.collidedLocation.name === "Rockethome") {
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
                            : `${collisionInfos.collidedLocation.activities?.[i]}`
                        }
                    </button>
                ))}

                {activityMsg && (
                    <div style={{
                        position: 'absolute',
                        top: '60px',
                        left: '50%',
                        transform: 'translateX(-50%)',
                        backgroundColor: '#0D061F',
                        color: '#ffdba2',
                        padding: '3px 6px',
                        fontSize: '0.4em',
                        border: '1px solid #ffdba2',
                        zIndex: '9999',
                        whiteSpace: 'nowrap'
                    }}>
                        {activityMsg}
                    </div>
                )}

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