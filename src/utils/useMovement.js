import { useEffect } from 'react';

export function useMovement(setVelocity) {
  useEffect(() => {
    const handleKeyDown = (e) => {
      setVelocity((prev) => {
        switch (e.key) {
          case 'ArrowRight':
            return { ...prev, x: -2 };
          case 'ArrowLeft':
            return { ...prev, x: 2 };
          case 'ArrowUp':
            return { ...prev, y: 2 };
          case 'ArrowDown':
            return { ...prev, y: -2 };
          default:
            return prev;
        }
      });
    };

    const handleKeyUp = (e) => {
      setVelocity((prev) => {
        switch (e.key) {
          case 'ArrowRight':
          case 'ArrowLeft':
            return { ...prev, x: 0 };
          case 'ArrowUp':
          case 'ArrowDown':
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
  }, [setVelocity]);
}
