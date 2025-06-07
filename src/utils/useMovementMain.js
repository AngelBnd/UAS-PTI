import { useEffect, useRef } from 'react';

export function useMovementMain(setVelocity,direction,movementLock) {
  const movementLockRef = useRef(movementLock);

  useEffect(() => {
    movementLockRef.current = movementLock;
    console.log(movementLock);
    console.log("hello");
  }, [movementLock]);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (movementLockRef.current) return;
      setVelocity((prev) => {
        switch (e.key) {
          case 'ArrowRight': case 'd':
            return { ...prev, x: -2 };
          case 'ArrowLeft': case 'a':
            return { ...prev, x: 2 };
          case 'ArrowUp': case 'w':
            return { ...prev, y: 2 };
          case 'ArrowDown': case 's':
            return { ...prev, y: -2 };
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
  }, [setVelocity,movementLock]);

  useEffect(()=>{
    if (movementLockRef.current) {
      setVelocity({ x: 0, y: 0 });
      return;
    }

    const vel = { x: 0, y: 0 };
    if (direction.left) vel.x = 2;
    if (direction.right) vel.x = -2;
    if (direction.up) vel.y = 2;
    if (direction.down) vel.y = -2;
    setVelocity(vel);
  },[direction,setVelocity])
}
