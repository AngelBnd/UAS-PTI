export function isColliding(playerRef, collidableObjects, collidableObjectsRefs, collisionInfos){
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

                break;

            
                
            }
            for(let j = 0 ; j < n ; j++){
                let locationRect = colObjRef.current[j]?.getBoundingClientRect?.();
                if (!locationRect) continue;

                if(playerRect.left > locationRect.left + locationRect.width || locationRect.left > playerRect.left + playerRect.width || playerRect.top > locationRect.height + locationRect.top || locationRect.top > playerRect.top + playerRect.height){
                    if(collisionInfos.holderofindexJ === j && collisionInfos.holderofindexI === i){
                        collisionInfos.cool = 0;
                        collisionInfos.showed = 0;
                        collisionInfos.collidedPlanet = 0;
                    }
                } else {
                    collisionInfos.cool = 1;
                    collisionInfos.holderofindexJ = j;
                    collisionInfos.holderofindexI = i;
                    break;
                }
            }
                
            if(collisionInfos.cool && !collisionInfos.showed){
                const obj = collidableObjects[collisionInfos.holderofindexI][collisionInfos.holderofindexJ];
                console.log(`${obj.name}`);
                collisionInfos.showed = 1;
                collisionInfos.collidedPlanet = obj.name;

                if(i===1){
                    collisionInfos.collidedItem = obj.name;
                }
            }
        }
        
    }
