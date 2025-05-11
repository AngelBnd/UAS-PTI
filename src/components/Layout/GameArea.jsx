import './GameArea.css';
import './PixelArt.css';
import gameBackground from '../../assets/playerareabg.png';

export default function GameArea() {
    return (
        <div id="game-area">
            <img id="game-area-background" className="pixel-art" src={gameBackground}/>
        </div>
    );
}