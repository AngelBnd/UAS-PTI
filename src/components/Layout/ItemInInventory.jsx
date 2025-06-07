import './Inventory.css';
import { useStats } from '../../utils/statsContext';
import './AAResponsiveness.css';

export default function ItemInInventory({item, setItemsInInventory}){
    const { playerStats, setStats } = useStats();

    return(
        <div 
        id='itemInInventory' 
        className='d-flex justify-content-start align-items-center'
        onClick={(e) => {
            item.func(setStats);
            const clickedItem = item;
            console.log(clickedItem);
            setItemsInInventory((prevItems)=> prevItems.filter((items)=>items.id !== clickedItem.id))
        }}
        >
            {item.name}
        </div>
    )
}