import './SidePanel.css';
import Location from './Location';
import Inventory from './Inventory';
import GameButtons from './GameButtons';

export default function SidePanel(){
    return(
        <div className="container side-panel d-flex flex-column justify-content-center align-items-center gap-4 p-0 m-0">
            <Location/>
            <Inventory/>
            <GameButtons/>
        </div>
    )
}