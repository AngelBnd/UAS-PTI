import solezBG from '../../assets/solezBG.png';
import { useMovementMain } from '../../utils/useMovementMain';
import { useUpdateMovement } from '../../utils/useUpdateMovement';
import './PixelArt.css'
import { useRef, useState } from 'react';
import fullBod1 from '../../assets/fullbod1.png';
import fullBod2 from '../../assets/fullbod2.png';
import fullBod3 from '../../assets/fullbod3.png';

const fullbods = [fullBod1, fullBod2];

export default function SolezArena(){
    const[velocity, setVelocity] = useState({x:0,y:0});
    const playerRef = useRef(null);
    const mothership = 0;
    
    useMovementMain(setVelocity);
    useUpdateMovement(setVelocity, playerRef, velocity, mothership);

    return(
        <div>
            <img  
            src={solezBG}
            className="pixel-art"
            style={{
                position: 'absolute',
                objectFit: 'cover',
                zIndex: '-2',
                width: '80%',
                height: '80%',
                top: '150px',
                left: '0',
            }}
            />

            <div id="player" className='pixel-art' ref={playerRef}
            style ={{
                position: 'absolute',
                top: '400px',
                left: '600px',
                width: '50px',
                height: '50px',
            }}>
                <img id="playerimg" src={fullbods[1]}/>
            </div>
        </div>
    )
}