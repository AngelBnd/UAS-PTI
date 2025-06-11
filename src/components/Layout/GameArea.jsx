import './GameArea.css';
import './PixelArt.css';
import './AAResponsiveness.css';
import { useRef, useEffect, useState } from 'react';
import { isColliding } from '../../utils/collision';
import { useMovementMain } from '../../utils/useMovementMain';
import { LocationInfosMain } from '../../data/locationsMain';
import { items } from '../../data/itemsOnMap';
import { useTime } from '../../utils/timeContext';
import { useChar } from '../../utils/charContext';
import { useInventory } from '../../utils/inventoryContext';
import handlePickUpItem from '../../utils/pickUp';
import gameBackground from '../../assets/playerareabg.png';
import fullBod1 from '../../assets/fullbod1.png';
import fullBod2 from '../../assets/fullbod2.png';
import fullBod3 from '../../assets/fullbod3.png';
import stars1 from '../../assets/starsbg.png';
import stars2 from '../../assets/starsbg2.png';
import planetbg1 from '../../assets/planetbg1.png';
import planetbg2 from '../../assets/planetbg2.png';
import planetbg3 from '../../assets/planetbg3.png';
import Deathbar from './Deathbar';
import PopUpMessage from './PopUpMessage';
import Minimap from './Minimap';

const fullbods = [fullBod1, fullBod2, fullBod3];
let cool = 0, showed = 0, holderofindexJ = 0, holderofindexI = 0, collidedLocation, collidedItem;
const collisionInfos = { cool, showed, holderofindexI, holderofindexJ, collidedLocation, collidedItem };

const bgObjectsSpeed = [
  { x: 1.1, y: 1.1 },
  { x: 1.2, y: 1.2 },
  { x: 1.05, y: 1.05 },
  { x: 1.18, y: 1 },
  { x: 1.1, y: 1.1 }
];

export default function GameArea({
  setLocation,
  saveplayerLocation,
  saveplanetLocation,
  saveBGObjectLocation,
  itemsOnMap,
  setItemsOnMap,
  setShowMessage,
  showMessage,
  setMessageContent,
  messageContent,
  setMessageTrigger,
  messageTrigger,
  direction
}) {
  const planetRefs = useRef([]);
  const bgObjectsRefs = useRef([]);
  const itemRefs = useRef([]);
  const cameraRef = useRef(null);
  const playerRef = useRef(null);

  const [velocity, setVelocity] = useState({ x: 0, y: 0 });
  const [cameraPos, setCameraPos] = useState({ left: 0, top: 0 });
  const [showButton, setShowButton] = useState(false);

  const { time } = useTime();
  const { selectedChar, playerName } = useChar();
  const { itemsInInventory, setItemsInInventory } = useInventory();

  const charFullbody = selectedChar - 1;
  const collidableObjects = [LocationInfosMain, itemsOnMap];
  const collidableObjectsRefs = [planetRefs, itemRefs];

  useMovementMain(setVelocity, direction);

  useEffect(() => {
    let animationFrameId;

    const update = () => {
      const camera = cameraRef.current;
      const player = playerRef.current;

      if (!camera || !player) return;

      const maxLeft = 583;
      const maxTop = 265;
      const minLeft = -525;
      const minTop = -215;

      const minLeftPlayer = 0;
      const maxLeftPlayer = 1200;
      const minTopPlayer = 0;
      const maxTopPlayer = 530;

      const cameraLeft = parseInt(camera.style.left || 0, 10);
      const cameraTop = parseInt(camera.style.top || 0, 10);
      const playerLeft = parseInt(player.style.left || '250', 10);
      const playerTop = parseInt(player.style.top || '600', 10);

      const newCameraLeft = cameraLeft + velocity.x;
      const newCameraTop = cameraTop + velocity.y;
      const newPlayerLeft = playerLeft - velocity.x;
      const newPlayerTop = playerTop - velocity.y;

      const canMoveCameraX = newCameraLeft <= maxLeft && newCameraLeft >= minLeft;
      const canMoveCameraY = newCameraTop <= maxTop && newCameraTop >= minTop;
      const canMovePlayerX = newPlayerLeft <= maxLeftPlayer && newPlayerLeft >= minLeftPlayer;
      const canMovePlayerY = newPlayerTop <= maxTopPlayer && newPlayerTop >= minTopPlayer;

      if (canMoveCameraX) {
        if (playerLeft < 600 || playerLeft >= 610) {
          player.style.left = newPlayerLeft + 'px';
        } else {
          camera.style.left = newCameraLeft + 'px';
        }
      } else {
        if (canMovePlayerX) player.style.left = newPlayerLeft + 'px';
      }

      if (canMoveCameraY) {
        camera.style.top = newCameraTop + 'px';
        player.style.top = player.offsetTop + (velocity.y * -0.35) + 'px';
      } else {
        if (canMovePlayerY) player.style.top = newPlayerTop + 'px';
      }

      setCameraPos({ left: newCameraLeft, top: newCameraTop });

      planetRefs.current.forEach((planet, i) => {
        if (planet) {
          const planetOffset = LocationInfosMain[i].offSets;
          planet.style.left = `${planetOffset.left + newCameraLeft}px`;
          planet.style.top = `${planetOffset.top + newCameraTop}px`;
        }
      });

      bgObjectsRefs.current.forEach((stars, i) => {
        if (stars) {
          stars.style.left = `${newCameraLeft * bgObjectsSpeed[i].x}px`;
          stars.style.top = `${newCameraTop * bgObjectsSpeed[i].y}px`;
        }
      });

      itemsOnMap.forEach((itemData, i) => {
        const el = itemRefs.current[i];
        if (el && itemData.offSets) {
          el.style.left = `${itemData.offSets.left + newCameraLeft}px`;
          el.style.top = `${itemData.offSets.top + newCameraTop}px`;
        }
      });

      isColliding(playerRef, collidableObjects, collidableObjectsRefs, collisionInfos);
      setShowButton(!!collisionInfos.cool);

      animationFrameId = requestAnimationFrame(update);
    };

    animationFrameId = requestAnimationFrame(update);
    return () => cancelAnimationFrame(animationFrameId);
  }, [velocity, itemsOnMap]);

  return (
    <div id="game-area">
      <img
        id="game-area-background"
        className="pixel-art"
        src={gameBackground}
        ref={cameraRef}
        style={{ position: 'absolute' }}
      />

      {[stars1, stars2, planetbg1, planetbg2, planetbg3].map((img, i) => (
        <img
          key={i}
          src={img}
          className="pixel-art"
          ref={(el) => (bgObjectsRefs.current[i] = el)}
          style={{
            position: 'absolute',
            transform: 'scale(2)',
            objectFit: 'cover',
            zIndex: '-1'
          }}
        />
      ))}

      {LocationInfosMain.map((planet, i) => (
        <div
          key={i}
          ref={(el) => (planetRefs.current[i] = el)}
          className="d-flex flex-column"
          style={{
            position: 'absolute',
            zIndex: 7,
            width: `${planet.widthImg * 0.9}px`,
            height: `${planet.heightImg * 0.9}px`,
            backgroundColor: 'transparent'
          }}
        >
          <img
            src={planet.element}
            className={`pixel-art ${planet.classNamee}`}
            alt={`Planet ${i}`}
          />
        </div>
      ))}

      {itemsOnMap.map((item, i) =>
        item.visible ? (
          <img
            key={item.id}
            ref={(el) => (itemRefs.current[i] = el)}
            src={item.image}
            className="pixel-art"
            alt={`Item ${item.name}`}
            style={{
              position: 'absolute',
              width: `${item.widthImg}px`,
              height: `${item.heightImg}px`,
              zIndex: 5
            }}
          />
        ) : null
      )}

      <img
        ref={playerRef}
        src={fullbods[charFullbody]}
        className="pixel-art"
        alt="Player"
        style={{
          position: 'absolute',
          width: '28px',
          height: '45px',
          zIndex: 10
        }}
      />

      <Minimap
        cameraPos={cameraPos}
        playerRef={playerRef}
        planetRefs={planetRefs}
        itemRefs={itemRefs}
        itemsOnMap={itemsOnMap}
      />

      <PopUpMessage
        showMessage={showMessage}
        setShowMessage={setShowMessage}
        messageContent={messageContent}
        setMessageContent={setMessageContent}
        messageTrigger={messageTrigger}
        setMessageTrigger={setMessageTrigger}
        setShowButton={setShowButton}
        showButton={showButton}
        handlePickUpItem={() =>
          handlePickUpItem(
            collisionInfos.collidedItem,
            collisionInfos,
            itemRefs,
            setItemsInInventory,
            setItemsOnMap,
            itemsInInventory
          )
        }
      />

      <Deathbar />
    </div>
  );
}
