import './Inventory.css';
import ItemInInventory from './ItemInInventory';
import { useInventory } from '../../utils/inventoryContext';
import './AAResponsiveness.css';

export default function Inventory(){
    const { itemsInInventory } = useInventory();

    return(
        <div id="ParentInventory" className="d-flex flex-column justify-content-center align-items-center gap-2">
            <div>Inventory</div>
            <div id="inventory" className='d-flex flex-column justify-content-start align-items-center '>
                {itemsInInventory.map((item,i)=>(
                    <ItemInInventory item={item} key={item.id || i}/>
                ))}
            </div>
        </div>
    )
}