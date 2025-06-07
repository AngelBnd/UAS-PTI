import './ResourcesTime.css';
import './PixelArt.css';
import money from '../../assets/money.png'
import { useTime } from '../../utils/timeContext';


export default function ResourcesTime({resources}){
    const { time, day } = useTime();

    const hourNow = String(Math.trunc(time / 60)).padStart(2, "0");
    const minuteNow = String(Math.floor(time % 60)).padStart(2, "0");

    return(
        <div id="resourcesTime"   style={{
            
            transform: 'translateX(-20px)', 
        }}className="d-flex gap-4 align-items-center  ">
            <div id ="moneyInfo" className="d-flex flex-column align-items-end gap-4">
                <img src={money} className="pixel-art moneylogo" alt="moneyLogo"
                style={{ width: '35px', height: '35px', objectFit: 'contain' }}/>
                <div className="fontChange" style={{ fontSize: '1em', minWidth: '80px', textAlign:'right'}} 
                id="resources" >Ʀ{resources}</div>
            </div>
            
            <div className="d-flex flex-column gap-1" id="time-day">
                <div>
                    <div>TIME:</div>
                    <span id="counter">{hourNow}:{minuteNow}</span>
                </div>
                <div>
                    <div>DAY:</div>
                    <span id="days">{day}</span>
                </div>  
            </div>
        </div>
    )
}