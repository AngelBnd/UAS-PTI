import { useEffect } from 'react';
// import { MoveButton } from '../components/Layout/GameButtons';

export function btnMovement(setVelocity) {
  useEffect(() => {
    const mouseBtnDown = (e) => {
      setVelocity((prev) => {
        switch (e.btn) {
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
  }, [setVelocity]);
}
