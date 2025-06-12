import './SidePanel.css';
import Location from './Location';
import Inventory from './Inventory';
import MoveControls from './MoveControls';
import './AAResponsiveness.css';


export default function SidePanel({ ItemsInInventory, setItemsInInventory, setDirection}){
    return(
        <div id ="SidePanelContent" className="container side-panel d-flex flex-column justify-content-center align-items-center gap-4 p-0 m-0"
        style={{
            position: 'relative',
        }}>
            <Location/>
            <Inventory ItemsInInventory={ItemsInInventory} setItemsInInventory={setItemsInInventory}/>
            <MoveControls setDirection={setDirection} />
        </div>
    )
}