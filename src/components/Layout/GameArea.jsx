import './GameArea.css';
import './PixelArt.css';
import gameBackground from '../../assets/playerareabg.png';
import fullBod1 from '../../assets/fullbod1.png';
import fullBod2 from '../../assets/fullbod2.png';
import fullBod3 from '../../assets/fullbod3.png';

const fullbods = [fullBod1, fullBod2, fullBod3]

export default function GameArea() {
    return (
        <div id="game-area">
            <img id="game-area-background" className="pixel-art" src={gameBackground}/>
            <div id="player" className='pixel-art'>
                <img id="playerimg" src={fullbods[1]}/>
            </div>
        </div>
    );
}