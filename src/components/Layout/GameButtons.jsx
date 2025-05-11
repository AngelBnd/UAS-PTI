import './gameButtons.css';

export default function GameButtons(){
    return(
            <div id="movebuttons" class="container d-flex flex-column align-items-center my-4">
                <div>
                    <button id="arrowup" class="move-button"><img draggable="false" src="assets/up.png" onmouseover="this.src='assets/up-hovered.png';" onmousedown="this.src='assets/up-pressed.png';" onmouseup="this.src='assets/up-hovered.png';" onmouseout="this.src='assets/up.png';"></button>
                </div>
                <div class="d-flex justify-content-center">
                    <button id="arrowleft" class="move-button mx-5"><img draggable="false" src="assets/left.png" onmouseover="this.src='assets/left-hovered.png';" onmousedown="this.src='assets/left-pressed.png';" onmouseup="this.src='assets/left-hovered.png';" onmouseout="this.src='assets/left.png';"></button>
                    <button id="arrowright" class="move-button mx-5"><img draggable="false" src="assets/right.png" onmouseover="this.src='assets/right-hovered.png';" onmousedown="this.src='assets/right-pressed.png';" onmouseup="this.src='assets/right-hovered.png';" onmouseout="this.src='assets/right.png';"></button>
                </div>
                <div>
                    <button id="arrowdown" class="move-button"><img draggable="false" src="assets/down.png" onmouseover="this.src='assets/down-hovered.png';" onmousedown="this.src='assets/down-pressed.png';" onmouseup="this.src='assets/down-hovered.png';" onmouseout="this.src='assets/down.png';"></button>
                </div>
            </div>
    )
}