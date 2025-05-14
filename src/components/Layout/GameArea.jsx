import './GameArea.css';
import './PixelArt.css';
import { isColliding } from '../../utils/collision';
import { useRef, useEffect, useState } from 'react';
import gameBackground from '../../assets/playerareabg.png';
import fullBod1 from '../../assets/fullbod1.png';
import fullBod2 from '../../assets/fullbod2.png';
import fullBod3 from '../../assets/fullbod3.png';
import planet1 from '../../assets/planet1.png';
import planet2 from '../../assets/planet2.png';
import planet3 from '../../assets/planet3.png';
import planet4 from '../../assets/planet4.png';
import mothership from '../../assets/mothership.png';
import stars1 from '../../assets/starsbg.png';
import stars2 from '../../assets/starsbg2.png';
import planetbg1 from '../../assets/planetbg1.png';
import planetbg2 from '../../assets/planetbg2.png';
import planetbg3 from '../../assets/planetbg3.png';
import oxygentabung from '../../assets/oxygentabung.png';

const fullbods = [fullBod1, fullBod2, fullBod3];
const classNames = ['planet1', 'planet2', 'planet3', 'planet4','mothership'];

class planetInfo{
    constructor(name, element, classNamee, widthImg, heightImg, buttons, {left, top}) {
        this.name = name;
        this.element = element;
        this.classNamee = classNamee;
        this.widthImg = widthImg;
        this.heightImg = heightImg;
        this.buttons = buttons;
        this.offSets = {left, top};
        // this.buttonFunc = buttonFunc;
        // this.buttonName = buttonName;
        // this.tooltips = tooltips;
    }
}

class itemInfo{
    constructor(name, element, classNamee, widthImg, heightImg, {left, top}) {
        this.name = name; // nama
        this.element = element; // imageny
        this.classNamee = classNamee; // classname buat item
        this.widthImg = widthImg; // ya taulah
        this.heightImg = heightImg;
        this.offSets = {left, top}; // ini biar gerak
        // this.buttonFunc = buttonFunc;
        // this.buttonName = buttonName;
    }
}

const planetsLocations = [
    new planetInfo(
        "Ejwa",
        planet1, 
        "planet1",
        500, 
        500, 
        3,
        {left : -500, top : 280}
    ),
    new planetInfo(
        "Solez",
        planet2,
        "planet2",
        384, 
        384, 
        2,
        {left : 1250, top : 370}
    ),
    new planetInfo(
        "Sugma",
        planet3,
        "planet3",
        384, 
        354, 
        2,
        {left : -200, top : -220}
    ),
    new planetInfo(
        "Kaati",
        planet4,
        "planet4",
        160, 
        160, 
        2,
        {left : 1200, top : -150}
    ),
        new planetInfo(
        "Mothership",
        mothership, 
        "mothership",
        200, 
        190, 
        2,
        {left : 500, top : 200}
    )
];

const items = [
    new itemInfo(
        "item1",
        oxygentabung,
        "item",
        100,
        100,
        {left : 200, top : 200}
    ),
]

const collidableObjects = [planetsLocations,items];

const bgObjectsSpeed = [
    {x: 1.1, y: 1.1},
    {x: 1.2, y:1.2},
    {x: 1.05, y:1.05},
    {x: 1.18, y:1},
    {x: 1.1, y:1.1}
]

export default function GameArea() {
    const planetRefs = useRef([]);
    const bgObjectsRefs = useRef([]);
    const itemRefs = useRef([]);
    const cameraRef = useRef(null); 
    const playerRef = useRef(null);
    const[velocity, setVelocity] = useState({x:0,y:0});

    const collidableObjectsRefs = [planetRefs, itemRefs];

    useEffect(()=>{
        const handleKeyDown = (e)=>{
            setVelocity((prev)=>{
                switch(e .key){
                case 'ArrowRight':
                    return { ...prev, x: -2 };
                case 'ArrowLeft':
                    return { ...prev, x: 2 };
                case 'ArrowUp':
                    return { ...prev, y: 2 };
                case 'ArrowDown':
                    return { ...prev, y: -2 };
                default:
                    return prev;
                }
            }); 
        };

        const handleKeyUp = (e)=> {
            setVelocity((prev)=>{
                switch(e.key){
                    case 'ArrowRight' :
                    case 'ArrowLeft' :
                        return{...prev, x: 0 };
                    case 'ArrowUp' :
                    case 'ArrowDown' :
                        return{...prev, y: 0};
                    default:
                        return prev;
                }
            });
        };  

        window.addEventListener('keydown', handleKeyDown);
        window.addEventListener('keyup', handleKeyUp);

        return()=>{
            window.removeEventListener('keydown', handleKeyDown);
            window.removeEventListener('keyup', handleKeyUp);
        }

    }, []);

    useEffect(()=>{
        let animationFrameId;

        const update = () => {
            const camera = cameraRef.current;
            const player = playerRef.current;

            const maxLeft = 583;
            const maxTop = 265;
            const minLeft = -525; 
            const minTop = -215;


            const minLeftPlayer = 0;
            const maxLeftPlayer = 1200;

            const minTopPlayer = 0;
            const maxTopPlayer = 530; 
            if (!camera || !player) return;

            const cameraLeft  = parseInt(camera.style.left||0,10);
            const cameraTop  = parseInt(camera.style.top||0,10);
            const playerLeft = parseInt(player.style.left || '250', 10);
            const playerTop = parseInt(player.style.top || '600', 10);
            
 
            const newCameraLeft = cameraLeft + velocity.x;
            const newCameraTop = cameraTop + velocity.y;

            const newPlayerLeft = playerLeft - velocity.x;
            const newPlayerTop = playerTop - velocity.y;


            const canMoveCameraX = newCameraLeft <= maxLeft && newCameraLeft >= minLeft;
            const canMoveCameraY = newCameraTop <= maxTop && newCameraTop >= minTop;
            const canMovePlayerX = newPlayerLeft  <= maxLeftPlayer && newPlayerLeft  >= minLeftPlayer;
            const canMovePlayerY = newPlayerTop <= maxTopPlayer && newPlayerTop >= minTopPlayer;

           if (canMoveCameraX) {
                if (playerLeft < 600 || playerLeft >= 610) {
                    player.style.left = newPlayerLeft + 'px';
                } else {
                    camera.style.left = newCameraLeft + 'px';
                }
            } else {
                if (canMovePlayerX) player.style.left = newPlayerLeft + 'px';
            }

            if (canMoveCameraY) {
                camera.style.top = newCameraTop + 'px';
                player.style.top = player.offsetTop + (velocity.y * -0.35) + 'px';
            } else {
                if (canMovePlayerY) player.style.top = newPlayerTop + 'px';
            }

            planetRefs.current.forEach((planet, i) => {
                if (planet) {
                    const planetOffset = planetsLocations[i].offSets;
                    planet.style.left = `${planetOffset.left - (newCameraLeft*-1)}px`;
                    planet.style.top = `${planetOffset.top - (newCameraTop*-1)}px`;
                }
            });

            bgObjectsRefs.current.forEach((stars,i)=>{
                if(stars){
                    stars.style.left = `${newCameraLeft*bgObjectsSpeed[i].x}px`
                    stars.style.top = `${newCameraTop*bgObjectsSpeed[i].y}px`
                }
            });

            itemRefs.current.forEach((item,i)=>{
                if(item){
                    const itemOffset = items[i].offSets;
                    item.style.left = `${itemOffset.left - (newCameraLeft*-1)}px`;
                    item.style.top = `${itemOffset.top -  (newCameraTop*-1)}px`;
                }
            });

            isColliding(playerRef, collidableObjects, collidableObjectsRefs);
            animationFrameId = requestAnimationFrame(update);
        };
        animationFrameId = requestAnimationFrame(update);

        return()=> cancelAnimationFrame(animationFrameId);
    },[velocity]);

    return (
        
        <div id="game-area">
            
            <img id="game-area-background" className="pixel-art" src={gameBackground} ref={cameraRef}
            style ={{
                position: 'absolute',
                left : '0px',
                top : '0px',
            }}/>

            {[stars1,stars2,planetbg1,planetbg2,planetbg3].map((img, i)=>(
                <img
                key={i}
                src={img}   
                className='pixel-art'
                ref={(el) => (bgObjectsRefs.current[i] = el)}
                style={{
                    position:'absolute',
                    left : '0px',
                    top : '0px',
                    transform :'scale(2)',
                    objectFit : 'cover',
                    zIndex :'5',
                }}
                />
            ))}

            {planetsLocations.map((planet, i) => (
                    <img
                    key={i}
                    src={planet.element}
                    className={`pixel-art ${planet.classNamee}`}
                    ref={(el) => (planetRefs.current[i] = el)}
                    style={{
                        position: 'absolute',
                        left: `${planet.offSets.left}px`,
                        top: `${planet.offSets.top}px`,
                        width : `${planet.widthImg}px`,
                        height : `${planet.heightImg}px`,
                        zIndex :'7',
                    }}
                    />
            ))}

            {items.map((item, i)=>(
                <img
                key = {i}
                src = {item.element}
                ref = {(el) => (itemRefs.current[i] = el)}
                style={{
                    position : 'absolute',
                    left : `${item.offSets.left}px`,
                    top : `${item.offSets.top}px`,
                }}
                />
            ))}

            <div id="player" className='pixel-art' ref={playerRef}
            style ={{
                top: '250px',
                left: '600px',
                width: '50px',
                height: '50px',
            }}>
                <img id="playerimg" src={fullbods[1]}/>
            </div>

        </div>
    );
}