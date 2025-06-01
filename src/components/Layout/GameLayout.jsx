import 'bootstrap/dist/css/bootstrap.min.css';
import { useState, useEffect, useRef } from 'react';
import GameArea from './GameArea';
import TopPanel from './TopPanel';
import SidePanel from './SidePanel';
import EjwaArena from './EjwaArena';
import SolezArena from './SolezArena';
import SugmaArena from './SugmaArena';
import KaatiArena from './KaatiArena';
import MothershipArena from './MothershipArena';
import { items } from '../../data/itemsOnMap';
import Minimap from './Minimap';
import { useChar } from '../../utils/charContext';

export default function GameLayout() {
  const { teleportTo } = useChar();

  const [location, setLocation] = useState('MainArea');

  // Jika ingin teleport pakai setLocation, sinkronkan juga ke teleportTo
  useEffect(() => {
    // misal teleport ke posisi sesuai lokasi yang dipilih (optional)
    // bisa mapping lokasi ke koordinat dan teleport
  }, [location]);

  const savePlayerLocationRef = useRef({ playerTop: 250, playerLeft: 600, cameraTop: 0, cameraLeft: 0 });
  const planetPositionsRef = useRef([]);
  const bgObjectsPositionsRef = useRef([]);

  const [itemsOnMap, setItemsOnMap] = useState(() =>
    items.map(item => ({
      ...item,
    }))
  );

  const [ItemsInInventory, setItemsInInventory] = useState([]);
  const [showMessage, setShowMessage] = useState(false);
  const [messageContent, setMessageContent] = useState('');
  const [messageTrigger, setMessageTrigger] = useState(0);
  const [isDead, setIsDead] = useState(false);

  return (
    <div className="d-flex">
      <div style={{ flex: '1 1 85%', zIndex: '0', overflow: 'hidden', position: 'relative' }}>
        <Minimap />
        <TopPanel setIsDead={setIsDead} />

        {location === 'MainArea' && (
          <GameArea
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
          />
        )}

        {location === 'Ejwa' && <EjwaArena setLocation={setLocation} />}
        {location === 'Solez' && <SolezArena setLocation={setLocation} />}
        {location === 'Sugma' && <SugmaArena setLocation={setLocation} />}
        {location === 'Kaati' && <KaatiArena setLocation={setLocation} />}
        {location === 'Mothership' && <MothershipArena setLocation={setLocation} />}
      </div>

      <div style={{ flex: '1 1 18%', zIndex: '1' }}>
        <SidePanel
          ItemsInInventory={ItemsInInventory}
          setItemsInInventory={setItemsInInventory}
          setShowMessage={setShowMessage}
          setMessageContent={setMessageContent}
        />
      </div>
    </div>
  );
}
