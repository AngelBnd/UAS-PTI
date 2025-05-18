import { useEffect } from 'react';
import { isColliding } from './collision';

export function useUpdateMovement(setVelocity, playerRef, velocity, mothership, collidableObjects, collidableObjectsRefs, collisionInfos){
        useEffect(()=>{
            let animationFrameId;
    
            const update = () => {
                const player = playerRef.current;
    
                
                const minLeftPlayer = 15;
                const maxLeftPlayer = 1200;
    
                const minTopPlayer = 170;
                const maxTopPlayer = 670; 
                if (!player) return;
    
                const playerLeft = parseInt(player.style.left || '250', 10);
                const playerTop = parseInt(player.style.top || '600', 10);
                
                const newPlayerLeft = playerLeft - velocity.x;
                const newPlayerTop = playerTop - velocity.y;
    
                const canMovePlayerX = newPlayerLeft  <= maxLeftPlayer && newPlayerLeft  >= minLeftPlayer;
                const canMovePlayerY = newPlayerTop <= maxTopPlayer && newPlayerTop >= minTopPlayer;
    
                if(canMovePlayerX){
                    player.style.left = newPlayerLeft + 'px';
                }
    
                if(canMovePlayerY && !mothership){
                    player.style.top = newPlayerTop + 'px';
                }
                
    
                isColliding(playerRef, collidableObjects, collidableObjectsRefs, collisionInfos);
                
                // if(collisionInfos.cool) setShowButton(true);
                // else setShowButton(false);
    
    
                animationFrameId = requestAnimationFrame(update);
            };
            animationFrameId = requestAnimationFrame(update);
    
            return()=> cancelAnimationFrame(animationFrameId);
        },[velocity]);
}