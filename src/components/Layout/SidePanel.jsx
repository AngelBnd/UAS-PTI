import './SidePanel.css';
import Location from './Location';
import Inventory from './Inventory';

export default function SidePanel(){
    return(
        <div className="container side-panel d-flex flex-column justify-content-center align-items-center gap-5 p-0 m-0">
            <Location/>
            <Inventory/>
        </div>
    )
}