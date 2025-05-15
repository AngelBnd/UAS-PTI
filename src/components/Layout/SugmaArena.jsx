import sugmaBG from '../../assets/sugmaBG.png'
import './PixelArt.css'
import { useRef, useEffect, useState } from 'react';
import fullBod1 from '../../assets/fullbod1.png';
import fullBod2 from '../../assets/fullbod2.png';
import fullBod3 from '../../assets/fullbod3.png';

const fullbods = [fullBod1, fullBod2];

export default function SugmaArena(){
    const[velocity, setVelocity] = useState({x:0,y:0});
    const playerRef = useRef(null);

    
    return(
        <div>
            <img  
            src={sugmaBG}
            className = "pixel-art"
            style = {{
                position: 'absolute',
                left : '250px',
                top : '200px',
                zIndex :'-2',
                transform : 'scale(3)',                
            }}/>

            <div id="player" className='pixel-art' ref={playerRef}
            style ={{
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