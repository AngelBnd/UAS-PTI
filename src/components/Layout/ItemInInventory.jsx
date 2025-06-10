import './Inventory.css';
import { useStats } from '../../utils/statsContext';
import './AAResponsiveness.css';
import { useInventory } from '../../utils/inventoryContext';

export default function ItemInInventory({item, onItemClick}){
    const { playerStats, setStats } = useStats();
    const { setItemsInInventory } = useInventory();

    const handleClick = () => {
        if(onItemClick) {
            onItemClick();
        } else {
            if(item.func) {
                item.func(setStats);
            }
            setItemsInInventory(prevItems => prevItems.filter(i => i.id !== item.id));
        }
    }

    return(
        <div 
        id='itemInInventory' 
        className='d-flex justify-content-start align-items-center'
        onClick={handleClick}
        >
            {item.name}
        </div>
    );
}