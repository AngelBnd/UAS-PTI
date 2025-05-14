    export function isColliding(playerRef, collidableObjects, collidableObjectsRefs){
        console.log("collidableObjects:", collidableObjects);
        const playerRect = playerRef.current.getBoundingClientRect();
        let cool, showed, holderofindex;

        for(let i = 0 ; i < collidableObjects.length; i++){
            switch (i) {
                case 0:
                    for(let j = 0 ; j < collidableObjects[i].length ; j++){
                        let locationRect = collidableObjectsRefs[i].current[j].getBoundingClientRect();
    
                        if(playerRect.left > locationRect.left + locationRect.width || locationRect.left > playerRect.left + playerRect.width || playerRect.top > locationRect.height + locationRect.top || locationRect.top > playerRect.top + playerRect.height){
                            if(holderofindex == j){
                                cool = 0;
                                showed = 0;
                            }
                        } else {
                            cool = 1;
                            holderofindex = j;
                            console.log("collided with a planet");
                            break;
                        }
                    }

                    break;
                case 1:
                    
                    break;
                default:
                    
                }
        }
        
    }
