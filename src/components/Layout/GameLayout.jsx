import 'bootstrap/dist/css/bootstrap.min.css';
import { useState, useRef, useEffect } from 'react';
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
import DeathBar from './Deathbar';
import { items } from '../../data/itemsOnMap';
import PopUpMessage from './PopUpMessage';
import { useTime } from '../../utils/timeContext';
import './AAResponsiveness.css';
import { useChar } from '../../utils/charContext';

export default function GameLayout() {
    const { time } = useTime();
    const [Location, setLocation] = useState('MainArea');
    const [ resources, setResources] = useState(0);
    const { selectedChar, playerName } = useChar();

    const [direction, setDirection] = useState({
        up: false,
        down: false,
        left: false,
        right: false,
    });

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
    const[messageContent, setMessageContent] = useState("");
    const [messageTrigger, setMessageTrigger] = useState(0);
    const[isDead,setIsDead] = useState(false);
    
    useEffect(() => {
        if (time === 0) {
            setMessageContent("Good Morning " + playerName + "!");
            setMessageTrigger(prev=>prev+1);  
        } else if (time === 720) {
            setMessageContent("Good Afternoon " + playerName + "!");
            setMessageTrigger(prev=>prev+1);
        } else if (time === 1080) {
            setMessageContent("Good Night " + playerName + "!");
            setMessageTrigger(prev=>prev+1);
        }
    }, [time, playerName]);

    

    useEffect(()=>{
        setShowMessage(true);
        const timeoutId = setTimeout(() => {
            setShowMessage(false);
        }, 3400);

        return () => clearTimeout(timeoutId); 
    },[messageTrigger])


    return (
        <div id="mainLayout" className="d-flex w-100">
            {/* {isDead && <DeathBar/>}  */}
            {showMessage && <PopUpMessage message={messageContent} />}
            
            <div id ="TopPanel" style={{ flex: '1 1 85%', zIndex :'0', overflow : 'hidden' }}>
                <TopPanel 
                setIsDead = {setIsDead}
                resources = {resources}
                setResources = {setResources}
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
                direction = {direction}
                resources = {resources}
                setResources = {setResources}
                />}
                {Location === 'Ejwa' && <EjwaArena 
                setLocation={setLocation} 
                direction = {direction}
                resources = {resources}
                setResources = {setResources}
                setMessageContent={setMessageContent}
                setMessageTrigger={setMessageTrigger}
                />}
                {Location === 'Solez' && <SolezArena 
                setLocation={setLocation}
                direction = {direction}
                resources = {resources}
                setResources = {setResources}
                setMessageContent={setMessageContent}
                setMessageTrigger={setMessageTrigger}
                />}
                {Location === 'Sugma' && <SugmaArena 
                setLocation={setLocation}
                direction = {direction}
                />}
                {Location === 'Kaati' && <KaatiArena 
                setLocation={setLocation}
                direction = {direction}
                resources = {resources}
                setResources = {setResources}
                setMessageContent={setMessageContent}
                setMessageTrigger={setMessageTrigger}
                setItemsInInventory={setItemsInInventory}
                ItemsInInventory={ItemsInInventory}
                />}
                {Location === 'Mothership' && <MothershipArena
                setLocation={setLocation}
                direction = {direction}
                 />}
                

            </div>
            <div id ="SidePanel" style={{ flex: '1 1 18%', zIndex :'1' }}>
                <SidePanel
                ItemsInInventory={ItemsInInventory}
                setItemsInInventory={setItemsInInventory}
                setShowMessage={setShowMessage}
                setMessageContent={setMessageContent}
                setDirection={setDirection}
                />
            </div>
        </div>
    )
}