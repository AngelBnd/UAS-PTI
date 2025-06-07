import './GameArea.css';
import './PixelArt.css';
import { isColliding } from '../../utils/collision';
import { useMovementMain } from '../../utils/useMovementMain';
import handleLocationChange from '../../utils/handleLocationChange';
import handlePickUpItem from '../../utils/pickUp';
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
import { items } from '../../data/itemsOnMap';
import { Deathbar } from './Deathbar';
import PopUpMessage from './PopUpMessage';
import { useTime } from '../../utils/timeContext';
import { useChar } from '../../utils/charContext';
import './AAResponsiveness.css';

const fullbods = [fullBod1, fullBod2, fullBod3];
let cool = 0 , showed = 0, holderofindexJ = 0, holderofindexI = 0, collidedLocation, collidedItem;
const collisionInfos = {cool, showed, holderofindexI, holderofindexJ, collidedLocation, collidedItem};

const bgObjectsSpeed = [
    {x: 1.1, y: 1.1},
    {x: 1.2, y:1.2},
    {x: 1.05, y:1.05},
    {x: 1.18, y:1},
    {x: 1.1, y:1.1}
]

export default function GameArea({ setLocation, saveplayerLocation, saveplanetLocation, saveBGObjectLocation, itemsOnMap, setItemsOnMap, setItemsInInventory, ItemsInInventory, setShowMessage, showMessage, setMessageContent, messageContent, setMessageTrigger, messageTrigger,direction}) {
    const planetRefs = useRef([]);
    const bgObjectsRefs = useRef([]);
    const itemRefs = useRef([]);
    const cameraRef = useRef(null); 
    const playerRef = useRef(null);
    const [velocity, setVelocity] = useState({x:0,y:0});
    const [showButton, setShowButton] = useState(false);
    const [cameraPos, setCameraPos] = useState({ left: 0, top: 0 });
    const [isGameOver, setGameOver] = useState(false);

    const collidableObjects = [LocationInfosMain,itemsOnMap];
    const { time } = useTime();
    const collidableObjectsRefs = [planetRefs, itemRefs];
    const { selectedChar, playerName } = useChar();

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
        isOverlapping(
            pos,
            { width: item.widthImg, height: item.heightImg },
            playerPos,
            { width: 28, height: 45 }
        )
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

    const positions = getRandomPositionNonOverlapping(items, maxWidth, maxHeight, padding, playerPos);

    const spawnedItems = items.map((item, i) => ({
        ...item,
        used: false,
        visible : true,
        offSets: {
            left: positions[i].left,
            top: positions[i].top,
        }
    }));

    setItemsOnMap(spawnedItems);
    }, []);


    function getRandomValidPosition(item, playerPos) {
    const isOverlapping = (pos1, size1, pos2, size2) => {
    return !(
        pos1.left + size1.width + padding < pos2.left ||
        pos1.left > pos2.left + size2.width + padding ||
        pos1.top + size1.height + padding < pos2.top ||
        pos1.top > pos2.top + size2.height + padding
        );
    };

    const planetAreas = LocationInfosMain.map(p => ({
        pos: p.offSets,
        size: { width: p.widthImg, height: p.heightImg }
    }));

    const maxAttempts = 500;
    let attempt = 0;
    let pos;

    do {
        pos = {
        left: Math.floor(Math.random() * (maxWidth - item.widthImg)),
        top: Math.floor(Math.random() * (maxHeight - item.heightImg)),
        };
        attempt++;
    } while (
        isOverlapping(pos, { width: item.widthImg, height: item.heightImg }, playerPos, { width: 28, height: 45 }) ||
        planetAreas.some(p => isOverlapping(pos, { width: item.widthImg, height: item.heightImg }, p.pos, p.size))
        && attempt < maxAttempts
    );
        return pos;
    }


    function handlePickUpItem(item, collisionInfos, itemRefs, setItemsInInventory, setItemsOnMap, ItemsInInventory) {
        setItemsInInventory((prev) => {
        if (prev.find(i => i.id === item.id)) return prev;
        return [...prev, item];
        });

        setItemsOnMap(prev =>
        prev.map((i) =>
        i.id === item.id ? { ...i, used: true } : i
        )
    )

    setTimeout(() => {
    const playerLeft = parseInt(playerRef.current?.style.left || 250);
    const playerTop = parseInt(playerRef.current?.style.top || 600);
    const playerPos = { left: playerLeft, top: playerTop };

    const newPos = getRandomValidPosition(item, playerPos);
        setItemsOnMap(prev =>
                prev.map((i) =>
                i.id === item.id
                ? { ...i, visible: false }
                : i
            )
        );

        requestAnimationFrame(() => {
        const itemIndex = itemsOnMap.findIndex(i => i.id === item.id);
        const el = itemRefs.current[itemIndex];

        if (el) {
            el.style.left = `${newPos.left + saveplayerLocation.current.cameraLeft}px`;
            el.style.top = `${newPos.top + saveplayerLocation.current.cameraTop}px`;
        }

        requestAnimationFrame(() => {
        setItemsOnMap(prev =>
            prev.map((i) =>
            i.id === item.id
                ? {
                    ...i,
                        used: false,
                        visible: true,
                        offSets: {
                        left: newPos.left,
                        top: newPos.top
                    }
                }
                : i
                )
            );
        });
    });
    }, 15000);

        collisionInfos.showed = 0;
        collisionInfos.cool = 0;
        collisionInfos.collidedItem = null;
        collisionInfos.holderofindexJ = 0;
        setShowButton(false);
    }

// 
    // const health = 100;
    // const hunger = 100;
    // const energy = 100;
    // const oxygen = 100;
// 
    // const checkGameOver = () => {
        // setGameOver(false);
        // if (health <= 0 && hunger <= 0 && energy <= 0 && oxygen <= 0) {
            // setGameOver(true);
        // }
    // };


    useEffect(() => {
        const camera = cameraRef.current;
        const player = playerRef.current;

        if (camera) {
            camera.style.left = `${saveplayerLocation.current.cameraLeft}px`;
            camera.style.top = `${saveplayerLocation.current.cameraTop}px`;
            setCameraPos({ left: saveplayerLocation.current.cameraLeft, top: saveplayerLocation.current.cameraTop });
        }

        if (player) {
            player.style.left = `${saveplayerLocation.current.playerLeft}px`;
            player.style.top = `${saveplayerLocation.current.playerTop}px`;
        }

        planetRefs.current.forEach((planet, i) => {
            const saved = saveplanetLocation.current[i];
            if (planet && saved) {
                planet.style.left = saved.left;
                planet.style.top = saved.top;
            }
        });

        bgObjectsRefs.current.forEach((obj, i) => {
            const saved = saveBGObjectLocation.current[i];
            if (obj && saved) {
                obj.style.left = saved.left;
                obj.style.top = saved.top;
            }
        });

        itemsOnMap.forEach((itemData, i) => {
            const el = itemRefs.current[i];
            if (el && itemData && itemData.offSets) {
                el.style.width = `${itemData.widthImg}px`;
                el.style.height = `${itemData.heightImg}px`;
                el.style.left = `${itemData.offSets.left + saveplayerLocation.current.cameraLeft}px`;
                el.style.top = `${itemData.offSets.top + saveplayerLocation.current.cameraTop}px`;
            }
        });
    }, []);

    useMovementMain(setVelocity, direction);

    useEffect(() => {
        if (time === 0) {
            setMessageContent("Good Morning playername!");
            setMessageTrigger(prev=>prev+1);  
        } else if (time === 720) {
            setMessageContent("Good Afternoon playername!");
            setMessageTrigger(prev=>prev+1);
        } else if (time === 1080) {
            setMessageContent("Good Night playername!");
            setMessageTrigger(prev=>prev+1);
        }
    }, [time]);


    useEffect(()=>{
        setShowMessage(true);
        const timeoutId = setTimeout(() => {
            setShowMessage(false);
        }, 3400);

        return () => clearTimeout(timeoutId); 
    },[messageTrigger])

    useEffect(()=>{
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

            const cameraLeft  = parseInt(camera.style.left || 0, 10);
            const cameraTop  = parseInt(camera.style.top || 0, 10);
            const playerLeft = parseInt(player.style.left || '250', 10);
            const playerTop = parseInt(player.style.top || '600', 10);

            const newCameraLeft = cameraLeft + velocity.x;
            const newCameraTop = cameraTop + velocity.y;

            const newPlayerLeft = playerLeft - velocity.x;
            const newPlayerTop = playerTop - velocity.y;

            const canMoveCameraX = newCameraLeft <= maxLeft && newCameraLeft >= minLeft;
            const canMoveCameraY = newCameraTop <= maxTop && newCameraTop >= minTop;
            const canMovePlayerX = newPlayerLeft  <= maxLeftPlayer && newPlayerLeft  >= minLeftPlayer;
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
                    planet.style.left = `${planetOffset.left - (newCameraLeft * -1)}px`;
                    planet.style.top = `${planetOffset.top - (newCameraTop * -1)}px`;
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

            if (collisionInfos.cool) setShowButton(true);
            else setShowButton(false);

            animationFrameId = requestAnimationFrame(update);
        };

        animationFrameId = requestAnimationFrame(update);

        return () => cancelAnimationFrame(animationFrameId);
    }, [velocity]);

    return (
        <div id="game-area">
            <img id="game-area-background" className="pixel-art" src={gameBackground} ref={cameraRef}
                style={{
                    position: 'absolute',
                }}
            />

            {[stars1, stars2, planetbg1, planetbg2, planetbg3].map((img, i) => (
                <img
                    key={i}
                    src={img}
                    className='pixel-art'
                    ref={(el) => (bgObjectsRefs.current[i] = el)}
                    style={{
                        position: 'absolute',
                        transform: 'scale(2)',
                        objectFit: 'cover',
                        zIndex: '-1',
                    }}
                />
            ))}


            {LocationInfosMain.map((planet, i) => (
                <div className='d-flex flex-column'
                    ref={(el) => (planetRefs.current[i] = el)}
                    style={{
                        position: 'absolute',
                        zIndex: '7',
                        width: `${planet.widthImg * 0.9}px`,
                        height: `${planet.heightImg * 0.9}px`,
                        backgroundColor: 'red',
                    }}>
                    <img
                        key={i}
                        src={planet.element}
                        className={`pixel-art ${planet.classNamee}`}
                        style={{
                            position: 'relative',
                            width: `${planet.widthImg}px`,
                            height: `${planet.heightImg}px`,
                            zIndex: '1',
                        }}
                    />
                </div>
            ))}

            {itemsOnMap.map((item, i) => (
                item && !item.used && (
                <img
                    id={i}
                    key={item.id}
                    src={item.element}
                    ref={(el) => {
                    itemRefs.current[i] = el;
                }}
                style={{
                position: 'absolute',
                width: `${item.widthImg}px`,
                height: `${item.heightImg}px`,
                }}
                />
                )
            ))}

            <div id="player" className='pixel-art' ref={playerRef}
                style={{
                    position: 'relative',
                    zIndex: '100',
                    width: '28px',
                    height: '45px',
                    overflow: 'visible',
                    pointerEvents: 'none',
                    backgroundColor: 'red',
                }}>

                <img
                onClick={()=>{}}
                style={{
                    position :'absolute',
                    top: '0',   
                    left : '0', 
                    zIndex : '1',
                    
                }} id="playerimg" src={fullbods[1]}/>

                {showButton && (
                    <button
                        style={{
                            position: 'absolute',
                            width: '80px',
                            left: '90%',
                            top: '-20%',
                            backgroundColor: '#0D061F',
                            color: '#ffdba2',
                            border: 'solid 1.5px #ffdba2',
                            padding: '5px',
                            zIndex: '10000',
                            fontSize: '0.37em',
                            pointerEvents: 'auto'
                        }}
                        onClick={() => {
                            saveplayerLocation.current.playerLeft = parseInt(playerRef.current.style.left);
                            saveplayerLocation.current.playerTop = parseInt(playerRef.current.style.top);
                            saveplayerLocation.current.cameraLeft = parseInt(cameraRef.current.style.left);
                            saveplayerLocation.current.cameraTop = parseInt(cameraRef.current.style.top);

                            planetRefs.current.forEach((planet, i) => {
                                if (planet) {
                                    saveplanetLocation.current[i] = {
                                        left: planet.style.left,
                                        top: planet.style.top
                                    };
                                }
                            });

                            bgObjectsRefs.current.forEach((bgObj, i) => {
                                if (bgObj) {
                                    saveBGObjectLocation.current[i] = {
                                        left: bgObj.style.left,
                                        top: bgObj.style.top
                                    };
                                }
                            });

                            if (collisionInfos.holderofindexI === 0 && collisionInfos.collidedLocation) {
                                setLocation(collisionInfos.collidedLocation.name);
                            } else {
                                if (ItemsInInventory.length == 6) {
                                    setMessageContent("Your inventory is full!");
                                    setMessageTrigger(prev => prev + 1);
                                    return;
                                } else {
                                    handlePickUpItem(collisionInfos.collidedItem, collisionInfos, itemRefs, setItemsInInventory, setItemsOnMap, ItemsInInventory);
                                }
                            }
                        }}
                    >
                        {(() => {
                            if (collisionInfos.collidedLocation) {
                                return `Go to ${collisionInfos.collidedLocation.name}`;
                            } else if (collisionInfos.collidedItem) {
                                return `Pick up ${collisionInfos.collidedItem.name}`;
                            }
                        })()}
                    </button>
                )}

                {/* {isGameOver ? <Deathbar onRestart={checkGameOver} /> : <p>Game is running...</p>} */}
            </div>

        </div>
    );
}
