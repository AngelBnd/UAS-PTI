import './ResourcesTime.css';
import './PixelArt.css';
import money from '../../assets/money.png'


export default function ResourcesTime(){
    return(
        <div id="resourcesTime" className="d-flex gap-4 align-items-center">
            <div id ="moneyInfo" className="d-flex flex-column gap-3">
                <img src={money} className="pixel-art" alt="moneyLogo"/>
                <div className="fontChange" style={{fontSize: '0.85em'}} id="resources">test</div>
            </div>
            
            <div className="d-flex flex-column gap-1" id="time-day">
                <div>
                    <div>TIME:</div>
                    <span id="counter">00:00</span>
                </div>
                <div>
                    <div>DAY:</div>
                    <span id="days">1</span>
                </div>  
            </div>
        </div>
    )
}