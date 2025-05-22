    export function isColliding(playerRef, collidableObjects, collidableObjectsRefs, collisionInfos){
        if (!playerRef.current) return;
        const playerRect = playerRef.current.getBoundingClientRect();
        let n, colObjRef;

    for(let i = 0 ; i < collidableObjects.length; i++){
        switch (i) {
            case 0:
                n = collidableObjects[i].length;
                colObjRef = collidableObjectsRefs[i];
                break;

            case 1:
                n = collidableObjects[i].length;
                colObjRef = collidableObjectsRefs[i];
                break;

                default:
                    continue;                    
                }
                for(let j = 0 ; j < n ; j++){
                    const ref = colObjRef?.current?.[j];

                    if (!ref) continue; 
                    const locationRect = ref.getBoundingClientRect();

                    if(playerRect.left > locationRect.left + locationRect.width || locationRect.left > playerRect.left + playerRect.width || playerRect.top > locationRect.height + locationRect.top || locationRect.top > playerRect.top + playerRect.height){
                        if(collisionInfos.holderofindexJ === j && collisionInfos.holderofindexI === i){
                            collisionInfos.cool = false;
                            collisionInfos.showed = 0;
                            collisionInfos.collidedLocation = null;
                            collisionInfos.collidedItem = null;
                            collisionInfos.holderofindexI = -1;
                            collisionInfos.holderofindexJ = -1;
                        }
                    } else {
                        collisionInfos.cool = true;
                        collisionInfos.holderofindexJ = j;
                        collisionInfos.holderofindexI = i;
                        break;
                    }
                }
                    
                if(collisionInfos.cool && !collisionInfos.showed){
                     if(collisionInfos.holderofindexI === 0){
                        collisionInfos.collidedLocation = collidableObjects[collisionInfos.holderofindexI][collisionInfos.holderofindexJ];
                     } else {
                        collisionInfos.collidedItem = collidableObjects[collisionInfos.holderofindexI][collisionInfos.holderofindexJ];
                     }
                    collisionInfos.showed = 1;
                    // collisionInfos.collidedItem = collidableObjects[collisionInfos.holderofindexI][collisionInfos.holderofindexJ];
                    // collisionInfos.collidedLocation = collidableObjects[collisionInfos.holderofindexI][collisionInfos.holderofindexJ];
                    // collisionInfos.showed = 1;

                    // if(collisionInfos.holderofindexI === 1){
                    // collisionInfos.collidedItem = collidableObjects[collisionInfos.holderofindexI][collisionInfos.holderofindexJ];
                }


        }
        
    }
