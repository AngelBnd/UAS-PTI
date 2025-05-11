import { useState } from 'react';
import up from '../../assets/up.png';
import upHovered from '../../assets/up-hovered.png';
import upPressed from '../../assets/up-pressed.png';
import left from '../../assets/left.png';
import leftHovered from '../../assets/left-hovered.png';
import leftPressed from '../../assets/left-pressed.png';
import right from '../../assets/right.png';
import rightHovered from '../../assets/right-hovered.png';
import rightPressed from '../../assets/right-pressed.png';
import down from '../../assets/down.png';
import downHovered from '../../assets/down-hovered.png';
import downPressed from '../../assets/down-pressed.png';
import './GameButtons.css';

function MoveButton({ defaultImg, hoverImg, pressedImg, alt }) {
    const [src, setSrc] = useState(defaultImg);

    return (
        <button className="move-button">
            <img
                draggable="false"
                src={src}
                alt={alt}
                onMouseOver={() => setSrc(hoverImg)}
                onMouseDown={() => setSrc(pressedImg)}
                onMouseUp={() => setSrc(hoverImg)}
                onMouseOut={() => setSrc(defaultImg)}
            />
        </button>
    );
}

export default function MoveControls() {
    return (
        <div id="movebuttons" className="d-flex flex-column align-items-center">
            <div>
                <MoveButton defaultImg={up} hoverImg={upHovered} pressedImg={upPressed} alt="Up" />
            </div>
            <div className="d-flex justify-content-center">
                <div className="mx-5">
                    <MoveButton defaultImg={left} hoverImg={leftHovered} pressedImg={leftPressed} alt="Left" />
                </div>
                <div className="mx-5">
                    <MoveButton defaultImg={right} hoverImg={rightHovered} pressedImg={rightPressed} alt="Right" />
                </div>
            </div>
            <div>
                <MoveButton defaultImg={down} hoverImg={downHovered} pressedImg={downPressed} alt="Down" />
            </div>
        </div>
    );
}