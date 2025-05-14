    export function isColliding(playerRef, collidableObjects, collidableObjectsRefs, collisionInfos){
        const playerRect = playerRef.current.getBoundingClientRect();

        for(let i = 0 ; i < collidableObjects.length; i++){
            switch (i) {
                case 0:
                    for(let j = 0 ; j < collidableObjects[i].length ; j++){
                        let locationRect = collidableObjectsRefs[i].current[j].getBoundingClientRect();
                        if(playerRect.left > locationRect.left + locationRect.width || locationRect.left > playerRect.left + playerRect.width || playerRect.top > locationRect.height + locationRect.top || locationRect.top > playerRect.top + playerRect.height){
                            if(collisionInfos.holderofindexJ === j && collisionInfos.holderofindexI === i){
                                collisionInfos.cool = 0;
                                collisionInfos.showed = 0;
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
                        console.log(`${obj.name}`)
                        collisionInfos.showed = 1;
                    }

                    break;
                case 1:
                    
                    break;
                default:
                    
                }
        }
        
    }
