import 'bootstrap/dist/css/bootstrap.min.css';
import { useState, useRef, useEffect } from 'react';
import GameArea from './GameArea';
import TopPanel from './TopPanel';
import SidePanel from './SidePanel';
import EjwaArena from './EjwaArena';
import SolezArena from './SolezArena';
import SugmaArena from './SugmaArena';
import KaatiArena from './KaatiArena';
import MothershipArena from './MothershipArena';
import { LocationInfosMain } from '../../data/locationsMain';
import { items } from '../../data/itemsOnMap';
import PopUpMessage from './PopUpMessage';
import { useTime } from '../../utils/timeContext';
import './AAResponsiveness.css';
import { useChar } from '../../utils/charContext';
import Minimap from './Minimap';
import DeathBar from './Deathbar';
import { useInventory } from '../../utils/inventoryContext';

export default function GameLayout() {
    const { time } = useTime();
    const [Location, setLocation] = useState('MainArea');
    const [ resources, setResources] = useState(0);
    const { selectedChar, playerName } = useChar();
    
    // buat skore
    const [absoluteResources, setAbsoluteResources] = useState(0);
    const [resourcesSpent, setResourcesSpent] = useState(0);
    const [locationsVisited, setLocationsVisited] = useState([]);
    const [activitiesDone, setActivitiesDone] = useState(0);
    const [itemsUsed, setItemsUsed] = useState(0);
    const [itemsCollected, setItemsCollected] = useState(0);
    const beforeResourcesRef = useRef(0);
    const beforeInventoryAmountRef = useRef(0);
    const beforeLocationRef = useRef('');

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

    const { itemsInInventory, setItemsInInventory } = useInventory();
    const[showMessage, setShowMessage] = useState(false);
    const[messageContent, setMessageContent] = useState("");
    const [messageTrigger, setMessageTrigger] = useState(0);
    const [isDead, setIsDead] = useState(false);
    
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

    //=================SKOR===================
    useEffect(()=>{ 
      const diff = resources - beforeResourcesRef.current;

      console.log(` rscs ${resources}`);
      if(diff>0){
        setAbsoluteResources((prev)=>{
          let absRes = Math.abs(prev + diff);
          console.log(` abs rescs ${Math.abs(absRes)}`);
          return absRes;
        });
       
      } else {
        setResourcesSpent((prev)=>{
          let spntRes = prev + diff;
          return spntRes;
        })
      }
      beforeResourcesRef.current = resources;
      console.log(`bfr rscs${beforeResourcesRef.current}`)
    },[resources])

    useEffect(()=>{

      console.log(`inv length${itemsInInventory.length}`)
      const diff = itemsInInventory.length - beforeInventoryAmountRef.current;
        
      if (diff > 0) {
        setItemsCollected(prev => prev + diff);
      } else if (diff < 0) {
        setItemsUsed(prev => prev + Math.abs(diff));
      }

      beforeInventoryAmountRef.current = itemsInInventory.length;

    },[itemsInInventory.length])

    useEffect(()=>{
      if(Location==='MainArea') return;

      let same = 0;
      for(let i = 0 ; i < locationsVisited.length ; i++){
        if(Location === locationsVisited[i]){
          same = 1;
          break;
        }
      }

      if(!same) setLocationsVisited(prev=>[...prev, Location])
    },[Location])
//==============================================================

 return (
    <div id="mainLayout" className="d-flex w-100">
      {showMessage && <PopUpMessage message={messageContent} />}
      {isDead && <DeathBar
        absoluteResources={absoluteResources}
        resourcesSpent={resourcesSpent}
        locationsVisited = {locationsVisited}
        activitiesDone={activitiesDone}
        itemsUsed={itemsUsed}
        itemsCollected={itemsCollected}
      />}
      <div id="TopPanel" style={{ flex: '1 1 85%', zIndex: '0', overflow: 'hidden' }}>
        <TopPanel
          setIsDead={setIsDead}
          resources={resources}
          setResources={setResources}
        />
        {Location === 'MainArea' && <GameArea
          setLocation={setLocation}
          saveplayerLocation={savePlayerLocationRef}
          saveplanetLocation={planetPositionsRef}
          saveBGObjectLocation={bgObjectsPositionsRef}
          itemsOnMap={itemsOnMap}
          setItemsOnMap={setItemsOnMap}
          itemsInInventory={itemsInInventory}
          setItemsInInventory={setItemsInInventory}
          setShowMessage={setShowMessage}
          showMessage={showMessage}
          setMessageContent={setMessageContent}
          messageContent={messageContent}
          setMessageTrigger={setMessageTrigger}
          messageTrigger={messageTrigger}
          direction={direction}
          resources={resources}
          setResources={setResources}
          setActivitiesDone={setActivitiesDone}
        />}
        {Location === 'Ejwa' && <EjwaArena setActivitiesDone={setActivitiesDone} setLocation={setLocation} direction={direction} resources={resources} setResources={setResources} setMessageContent={setMessageContent} setMessageTrigger={setMessageTrigger} />}
        {Location === 'Solez' && <SolezArena setActivitiesDone={setActivitiesDone} setLocation={setLocation} direction={direction} resources={resources} setResources={setResources} setMessageContent={setMessageContent} setMessageTrigger={setMessageTrigger} />}
        {Location === 'Sugma' && <SugmaArena setActivitiesDone={setActivitiesDone} setLocation={setLocation} direction={direction} />}
        {Location === 'Kaati' && <KaatiArena setActivitiesDone={setActivitiesDone} setLocation={setLocation} direction={direction} resources={resources} setResources={setResources} setMessageContent={setMessageContent} setMessageTrigger={setMessageTrigger} setItemsInInventory={setItemsInInventory} itemsInInventory={itemsInInventory} />}
        {Location === 'Mothership' && <MothershipArena setActivitiesDone={setActivitiesDone} setLocation={setLocation} direction={direction} />}
      </div>

      <div id="SidePanel" style={{ flex: '1 1 18%', zIndex: '1' }}>
        <SidePanel
          itemsInInventory={itemsInInventory}
          setItemsInInventory={setItemsInInventory}
          setShowMessage={setShowMessage}
          setMessageContent={setMessageContent}
          setDirection={setDirection}
          currentLocation={Location}
        />
      </div>
    </div>
  );
}