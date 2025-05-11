import './Avatar.css';
import './PixelArt.css';
import char1 from '../../assets/char1.png';
import char2 from '../../assets/char2.png';
import char3 from '../../assets/char3.png';

const avatars = [char1, char2, char3];
export default function Avatar(){
    return(
        <div id="avatar" className="d-flex flex-column gap-2">
            <img className ="avatar-image pixel-art" src={avatars[1]} alt="avatar"/>
            <span className="avatar-name">test</span>
        </div>
    )
}