import { useChar } from '../../utils/charContext';
import { useEffect } from 'react';
import './Avatar.css';
import './PixelArt.css';
import char1 from '../../assets/char1.png';
import char2 from '../../assets/char2.png';
import char3 from '../../assets/char3.png';

const avatars = [char1, char2, char3];

export default function Avatar(){
    const { selectedChar, playerName } = useChar();
    const selectedAvatar = selectedChar - 1; // IF IT STARTS FROM 1

    return(
        <div id="avatar" className="d-flex flex-column gap-2 justify-content-center align-items-center">
            <img className ="avatar-image pixel-art" src={avatars[selectedAvatar]} alt="avatar"/>
            <span className="avatar-name">{playerName}</span>
        </div>
    )
}