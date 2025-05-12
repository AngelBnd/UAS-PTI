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

const fullbods = [fullBod1, fullBod2, fullBod3];
const planetImages = [planet1, planet2, planet3, planet4];
const planetOffsets = [
  { left: 200, top: 100 },
  { left: 800, top: 300 },
  { left: 400, top: 50 },
  { left: 1000, top: 400 }
];

export default function GameArea() {
    const planetRefs = useRef([]);
    const cameraRef = useRef(null); 
    const playerRef = useRef(null);
    const planet1Ref = useRef(null);
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
            const planet1 = planet1Ref.current;

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
                    planetRefs.current.forEach((planet, i) => {
                    if (planet) {
                    planet.style.left = `${newCameraLeft + planetOffsets[i].left}px`;
                    }
          });
                }
            } else {
                if (canMovePlayerX) player.style.left = newPlayerLeft + 'px';
            }

            if (canMoveCameraY) {
                camera.style.top = newCameraTop + 'px';
                player.style.top = player.offsetTop + (velocity.y * -0.35) + 'px';
                planetRefs.current.forEach((planet, i) => {
                if (planet) {
                    planet.style.top = `${newCameraTop + planetOffsets[i].top}px`;
                }
        });
            } else {
                if (canMovePlayerY) player.style.top = newPlayerTop + 'px';
            }

            planetRefs.current.forEach((planet) => {
                if (planet) {
                    const offsetLeft = parseInt(planet.dataset.offsetLeft || 0, 10);
                    const offsetTop = parseInt(planet.dataset.offsetTop || 0, 10);
                    planet.style.left = `${newCameraLeft + offsetLeft}px`;
                    planet.style.top = `${newCameraTop + offsetTop}px`;
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


            {planetImages.map((img, i) => (
                    <img
                    key={i}
                    src={img}
                    className="pixel-art"
                    ref={(el) => (planetRefs.current[i] = el)}
                    style={{
                        position: 'absolute',
                        left: `${planetOffsets[i].left}px`,
                        top: `${planetOffsets[i].top}px`,
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