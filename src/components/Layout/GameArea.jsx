import './GameArea.css';
import './PixelArt.css';
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

const fullbods = [fullBod1, fullBod2, fullBod3];
const planetImages = [planet1, planet2, planet3, planet4, mothership];
const classNames = ['planet1', 'planet2', 'planet3', 'planet4','mothership'];
const planetOffsets = [
  { left: -300, top: 480 },
  { left: 1450, top: 450 },
  { left: -200, top: -20 },
  { left: 1200, top: 20 },
  { left: 600, top: 250},
];
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
    const cameraRef = useRef(null); 
    const playerRef = useRef(null);
    const[velocity, setVelocity] = useState({x:0,y:0});

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

        const move = () => {
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
                    const planetOffset = planetOffsets[i];
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

            
            animationFrameId = requestAnimationFrame(move);
        };
        animationFrameId = requestAnimationFrame(move);

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

            {planetImages.map((img, i) => (
                    <img
                    key={i}
                    src={img}
                    className={`pixel-art ${classNames[i]}`}
                    ref={(el) => (planetRefs.current[i] = el)}
                    style={{
                        position: 'absolute',
                        left: `${planetOffsets[i].left}px`,
                        top: `${planetOffsets[i].top}px`,
                        transform : [`scale(6)`,`scale(5.5)`,`scale(5.3)`,`scale(4.6)`,`scale(3)`][i],
                        zIndex :'7',
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