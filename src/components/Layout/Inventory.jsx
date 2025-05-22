    import './Inventory.css';
    import ItemInInventory from './ItemInInventory';

    export default function Inventory({ ItemsInInventory, setItemsInInventory }){
        return(
            <div className="d-flex flex-column justify-content-center align-items-center gap-2">
                <div>Inventory</div>
                <div id='inventory' className='d-flex flex-column justify-content-start align-items-center '>
                    {ItemsInInventory.map((item,i)=>(
                        <ItemInInventory item={item} key={i} setItemsInInventory={setItemsInInventory}/>
                    ))}
                </div>
            </div>
        )
    }