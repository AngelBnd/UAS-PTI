import { useState, useEffect } from 'react';
import './TradeInfo.css';
import './AAResponsiveness.css';

export default function TradeInfo({whatItemToSell, howMuchTheItem}){
    const[item, setItem] = useState('');
    useEffect(() => {
        switch (whatItemToSell) {
            case 1:
                setItem("coffee");
                break;
            case 2:
                setItem("tea");
                break;
            case 3:
                setItem("soda");
                break;
            case 4:
                setItem("donut");
                break;
            case 5:
                setItem("chocolate");
                break;
            default:
                setItem("");
                break;
        }
    }, [whatItemToSell]);
    return(
        <div id ="tradeInfo" className='trade-apply'>
            {item} for {howMuchTheItem} resources? :3    
        </div>
    )
}