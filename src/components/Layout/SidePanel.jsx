import './SidePanel.css';
import Location from './Location';
import Inventory from './Inventory';
import MoveControls from './MoveControls';

export default function SidePanel({ ItemsInInventory, setItemsInInventory, setDirection}){
    return(
        <div className="container side-panel d-flex flex-column justify-content-center align-items-center gap-4 p-0 m-0">
            <Location/>
            <Inventory ItemsInInventory={ItemsInInventory} setItemsInInventory={setItemsInInventory}/>
            <MoveControls setDirection={setDirection} />
        </div>
    )
}