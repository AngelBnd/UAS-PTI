import './GameArea.css';
import './PixelArt.css';
import { isColliding } from '../../utils/collision';
import { useMovementMain } from '../../utils/useMovementMain';
import { useRef, useEffect, useState } from 'react';
import gameBackground from '../../assets/playerareabg.png';
import fullBod1 from '../../assets/fullbod1.png';
import fullBod2 from '../../assets/fullbod2.png';
import fullBod3 from '../../assets/fullbod3.png';
import stars1 from '../../assets/starsbg.png';
import stars2 from '../../assets/starsbg2.png';
import planetbg1 from '../../assets/planetbg1.png';
import planetbg2 from '../../assets/planetbg2.png';
import planetbg3 from '../../assets/planetbg3.png';
import { LocationInfosMain } from '../../data/locationsMain';
import { useTime } from '../../utils/timeContext';
import { useChar } from '../../utils/charContext';
import { useInventory } from '../../utils/inventoryContext';
import './AAResponsiveness.css';

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
  setLocation, saveplayerLocation, saveplanetLocation, saveBGObjectLocation,
  itemsOnMap, setItemsOnMap, setShowMessage, showMessage,
  setMessageContent, messageContent, setMessageTrigger, messageTrigger, direction
}) {
  const planetRefs = useRef([]);
  const bgObjectsRefs = useRef([]);
  const itemRefs = useRef([]);
  const cameraRef = useRef(null);
  const playerRef = useRef(null);
  const [velocity, setVelocity] = useState({ x: 0, y: 0 });
  const [showButton, setShowButton] = useState(false);
  const [cameraPos, setCameraPos] = useState({ left: 0, top: 0 });

  const { time } = useTime();
  const { selectedChar, items: baseItems, updatePlayerPosition } = useChar();
  const { itemsInInventory, setItemsInInventory } = useInventory();

  const charFullbody = selectedChar - 1;

  const maxWidth = 1000;
  const maxHeight = 600;
  const padding = 15;

  function getRandomPositionNonOverlapping(items, maxWidth, maxHeight, padding, playerPos) {
    const positions = [];
    const isOverlapping = (pos1, size1, pos2, size2) => {
      return !(
        pos1.left + size1.width + padding < pos2.left ||
        pos1.left > pos2.left + size2.width + padding ||
        pos1.top + size1.height + padding < pos2.top ||
        pos1.top > pos2.top + size2.height + padding
      );
    };

    const maxAttempts = 500;

    for (const item of items) {
      let attempt = 0;
      let pos;
      do {
        pos = {
          left: Math.floor(Math.random() * (maxWidth - item.widthImg)),
          top: Math.floor(Math.random() * (maxHeight - item.heightImg)),
        };
        attempt++;
      } while (
        positions.some((p, idx) =>
          isOverlapping(
            pos,
            { width: item.widthImg, height: item.heightImg },
            p,
            { width: items[idx].widthImg, height: items[idx].heightImg }
          )
        ) ||
        isOverlapping(pos, { width: item.widthImg, height: item.heightImg }, playerPos, { width: 28, height: 45 })
        && attempt < maxAttempts
      );
      positions.push(pos);
    }
    return positions;
  }

  useEffect(() => {
    if (itemsOnMap.length > 0) return;

    const playerLeft = saveplayerLocation.current?.playerLeft || 250;
    const playerTop = saveplayerLocation.current?.playerTop || 600;
    const playerPos = { left: playerLeft, top: playerTop };

    const positions = getRandomPositionNonOverlapping(baseItems, maxWidth, maxHeight, padding, playerPos);

    const spawnedItems = baseItems.map((item, i) => ({
      ...item,
      used: false,
      visible: true,
      offSets: {
        left: positions[i].left,
        top: positions[i].top,
      }
    }));

    setItemsOnMap(spawnedItems);
  }, []);

  useMovementMain(setVelocity, direction);

  useEffect(() => {
    let animationFrameId;

    const update = () => {
      const camera = cameraRef.current;
      const player = playerRef.current;

      const maxLeft = 583;
      const maxTop = 265;
      const minLeft = -525;
      const minTop = -215;
      const minLeftPlayer = 0;
      const maxLeftPlayer = 1200;
      const minTopPlayer = 0;
      const maxTopPlayer = 530;

      if (!camera || !player) return;

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

      // 🟢 Update koordinat player ke context
      updatePlayerPosition({ x: parseInt(player.style.left), y: parseInt(player.style.top) });

      setCameraPos({ left: newCameraLeft, top: newCameraTop });

      // Posisi planet
      planetRefs.current.forEach((planet, i) => {
        if (planet) {
          const planetOffset = LocationInfosMain[i].offSets;
          planet.style.left = `${planetOffset.left - (newCameraLeft * -1)}px`;
          planet.style.top = `${planetOffset.top - (newCameraTop * -1)}px`;
        }
      });

      // Posisi background
      bgObjectsRefs.current.forEach((stars, i) => {
        if (stars) {
          stars.style.left = `${newCameraLeft * bgObjectsSpeed[i].x}px`;
          stars.style.top = `${newCameraTop * bgObjectsSpeed[i].y}px`;
        }
      });

      // Posisi item
      itemsOnMap.forEach((itemData, i) => {
        const el = itemRefs.current[i];
        if (el && itemData.offSets) {
          el.style.left = `${itemData.offSets.left + newCameraLeft}px`;
          el.style.top = `${itemData.offSets.top + newCameraTop}px`;
        }
      });

      isColliding(playerRef, [LocationInfosMain, itemsOnMap], [planetRefs, itemRefs], collisionInfos);
      setShowButton(collisionInfos.cool);

      animationFrameId = requestAnimationFrame(update);
    };

    animationFrameId = requestAnimationFrame(update);
    return () => cancelAnimationFrame(animationFrameId);
  }, [velocity]);

  return (
    <div id="game-area">
      {/* Game content here (planet rendering, player div, items, etc.) */}
    </div>
  );
}
