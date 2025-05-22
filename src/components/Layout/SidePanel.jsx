import './SidePanel.css';
import Location from './Location';
import Inventory from './Inventory';
import GameButtons from './GameButtons';

export default function SidePanel({ ItemsInInventory, setItemsInInventory}){
    return(
        <div className="container side-panel d-flex flex-column justify-content-center align-items-center gap-4 p-0 m-0">
            <Location/>
            <Inventory ItemsInInventory={ItemsInInventory} setItemsInInventory={setItemsInInventory}/>
            <GameButtons/>
        </div>
    )
}