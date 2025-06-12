import { useEffect, useRef, useState } from 'react';
import { useChar } from './charContext';

 const charMovement = [
  {
    id: 1,
    movementSpeed: 1.7
  },
  {
    id: 2,
    movementSpeed: 2
  },
  {
    id: 3,
    movementSpeed: 2.7
  },
 ]

export function useMovementMain(setVelocity,direction,movementLock) {
  const movementLockRef = useRef(movementLock);
  const { selectedChar } = useChar();
  const [speed, setSpeed] = useState(2.0);
  
  useEffect(() => {
    const currentChar = charMovement[selectedChar - 1] || charMovement[0];
    const newSpeed = currentChar.movementSpeed || 2.0;

    console.log(newSpeed);
    setSpeed(newSpeed);
  }, [selectedChar]);

  useEffect(() => {
    movementLockRef.current = movementLock;
  }, [movementLock]);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (movementLockRef.current) return;
      setVelocity((prev) => {
        switch (e.key) {
          case 'ArrowRight': case 'd':
            return { ...prev, x: -speed };
          case 'ArrowLeft': case 'a':
            return { ...prev, x: speed };
          case 'ArrowUp': case 'w':
            return { ...prev, y: speed };
          case 'ArrowDown': case 's':
            return { ...prev, y: -speed };
          default:
            return prev;
        }
      });
    };

    const handleKeyUp = (e) => {
      if (movementLockRef.current) return;
      setVelocity((prev) => {
        switch (e.key) {
          case 'ArrowRight': case 'd':
          case 'ArrowLeft': case 'a':
            return { ...prev, x: 0 };
          case 'ArrowUp': case 'w':
          case 'ArrowDown': case 's':
            return { ...prev, y: 0 };
          default:
            return prev;
        }
      });
    };

    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
    };
  }, [setVelocity,movementLock, speed]);

  useEffect(()=>{
    if (movementLockRef.current) {
      setVelocity({ x: 0, y: 0 });
      return;
    }

    const vel = { x: 0, y: 0 };
    if (direction.left) vel.x = speed;
    if (direction.right) vel.x = -speed;
    if (direction.up) vel.y = speed;
    if (direction.down) vel.y = -speed;
    setVelocity(vel);
  },[direction, setVelocity, speed])
}
