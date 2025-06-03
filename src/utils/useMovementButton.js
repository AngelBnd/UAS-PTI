export default function useMovementButton(setVelocity) {
    const handleMouseDown = (direction) => {
        setVelocity((prev) => {
            switch (direction) {
            case 'right':
                return { ...prev, x: -2 };
            case 'left':
                return { ...prev, x: 2 };
            case 'up':
                return { ...prev, y: 2 };
            case 'down':
                return { ...prev, y: -2 };
            default:
                return prev;
            }
        });
    };

    const handleMouseUp = (direction) => {
        setVelocity((prev) => {
            switch (direction) {
                case 'right':
                case 'left':
                    return { ...prev, x: 0 };
                case 'up':
                case 'down':
                    return { ...prev, y: 0 };
                default:
                    return prev;
            };
        });
    };

    return {
        handleMouseDown,
        handleMouseUp,
    };
}