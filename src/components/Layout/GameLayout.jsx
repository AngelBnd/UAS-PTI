import 'bootstrap/dist/css/bootstrap.min.css';
import { useState, useRef } from 'react';
import GameArea from './GameArea';
import TopPanel from './TopPanel';
import SidePanel from './SidePanel';
import handleLocationChange from '../../utils/handleLocationChange';
import EjwaArena from './EjwaArena';
import SolezArena from './SolezArena';
import SugmaArena from './SugmaArena';
import KaatiArena from './KaatiArena';
import MothershipArena from './MothershipArena';
import { LocationInfosMain } from '../../data/locationsMain';
import { items } from '../../data/itemsOnMap';
import DeathBar from './Deathbar';

export default function GameLayout() {
    const [Location, setLocation] = useState('MainArea');
    const savePlayerLocationRef = useRef({ playerTop: 250, playerLeft: 600, cameraTop:0, cameraLeft:0 });
    const planetPositionsRef = useRef([
        { left: LocationInfosMain[0].offSets.left, top: LocationInfosMain[0].offSets.top },
        { left: LocationInfosMain[1].offSets.left, top: LocationInfosMain[1].offSets.top },
        { left: LocationInfosMain[2].offSets.left, top: LocationInfosMain[2].offSets.top },
        { left: LocationInfosMain[3].offSets.left, top: LocationInfosMain[3].offSets.top },
        { left: LocationInfosMain[4].offSets.left, top: LocationInfosMain[4].offSets.top },
    ]);
    const bgObjectsPositionsRef = useRef([
        { left: 0, top: 0 },
        { left: 0, top: 0 }, 
        { left: 0, top: 0 }, 
        { left: 0, top: 0 },
        { left: 0, top: 0 }, 
    ]);

    const [itemsOnMap, setItemsOnMap] = useState(() =>
    items.map(item => ({
        id: item.id,
        name: item.name,
        element: item.element,
        className: item.classNamee,
        func : item.func,
        widthImg: item.widthImg,
        heightImg: item.heightImg,
        offSets: { ...item.offSets } 
    }))
    );
    const[ItemsInInventory, setItemsInInventory] = useState([]);
    const[showMessage, setShowMessage] = useState(false);
    const[messageContent, setMessageContent] = useState("Good morning, player name!");
    const [messageTrigger, setMessageTrigger] = useState(0);
    const[isDead,setIsDead] = useState(false);
    

    return (
        <div className="d-flex">
            {/* {isDead && <DeathBar/>}  */}
            <div style={{ flex: '1 1 85%', zIndex :'0', overflow : 'hidden' }}>
                <TopPanel 
                setIsDead = {setIsDead}
                />
                {Location === 'MainArea' && <GameArea 
                setLocation={setLocation} 
                saveplayerLocation={savePlayerLocationRef} 
                saveplanetLocation={planetPositionsRef} 
                saveBGObjectLocation={bgObjectsPositionsRef} 
                itemsOnMap={itemsOnMap}
                setItemsOnMap={setItemsOnMap}
                ItemsInInventory={ItemsInInventory}
                setItemsInInventory={setItemsInInventory}
                setShowMessage={setShowMessage}
                showMessage={showMessage}
                setMessageContent={setMessageContent}
                messageContent={messageContent}
                setMessageTrigger={setMessageTrigger}
                messageTrigger={messageTrigger}
                />}
                {Location === 'Ejwa' && <EjwaArena setLocation={setLocation} />}
                {Location === 'Solez' && <SolezArena setLocation={setLocation}/>}
                {Location === 'Sugma' && <SugmaArena setLocation={setLocation}/>}
                {Location === 'Kaati' && <KaatiArena setLocation={setLocation}/>}
                {Location === 'Mothership' && <MothershipArena setLocation={setLocation}/>}
                

            </div>
            <div style={{ flex: '1 1 18%', zIndex :'1' }}>
                <SidePanel
                ItemsInInventory={ItemsInInventory}
                setItemsInInventory={setItemsInInventory}
                setShowMessage={setShowMessage}
                setMessageContent={setMessageContent}
                />
            </div>
        </div>
    )
}

