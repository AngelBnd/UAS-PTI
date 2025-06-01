import React, { useEffect, useState } from 'react';
import { items } from '../../data/itemsOnMap';


const maxWidth = 1000;
const maxHeight = 600;
const padding = 10;

function getRandomPositionNonOverlapping(items, maxWidth, maxHeight, padding) {
  const positions = [];
  const isOverlapping = (pos, size, otherPos, otherSize) => {
    return !(
      pos.left + size.width + padding < otherPos.left ||
      pos.left > otherPos.left + otherSize.width + padding ||
      pos.top + size.height + padding < otherPos.top ||
      pos.top > otherPos.top + otherSize.height + padding
    );
  };

  const maxAttempts = 1000;

  for (const item of items) {
    let attempt = 0;
    let pos;
    do {
      pos = {
        left: Math.floor(Math.random() * (maxWidth - item.width)),
        top: Math.floor(Math.random() * (maxHeight - item.height)),
      };
      attempt++;
    } while (
      positions.some(
        (p, idx) =>
          isOverlapping(
            pos,
            { width: item.width, height: item.height },
            p,
            { width: items[idx].width, height: items[idx].height }
          )
      ) && attempt < maxAttempts
    );
    positions.push(pos);
  }

  return positions;
}

const GameComponent = ({ style }) => {
  const [activeItems, setActiveItems] = useState(() => {
    const positions = getRandomPositionNonOverlapping(
      items,
      maxWidth,
      maxHeight,
      padding
    );
    return items.map((item, idx) => ({
      ...item,
      position: positions[idx],
      used: false,
    }));
  });

  const handleUseItem = (id) => {
    setActiveItems((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, used: true, position: null } : item
      )
    );
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveItems((prevItems) => {
        const usedItems = prevItems.filter((i) => i.used);
        if (usedItems.length === 0) return prevItems;

        const positions = getRandomPositionNonOverlapping(
          usedItems,
          maxWidth,
          maxHeight,
          padding
        );
        const respawnedItems = usedItems.map((item, idx) => ({
          ...item,
          used: false,
          position: positions[idx],
        }));

        const unusedItems = prevItems.filter((i) => !i.used);
        return [...unusedItems, ...respawnedItems];
      });
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div style={{ ...style, width: maxWidth, height: maxHeight }}>
      {activeItems.map(
        (item) =>
          !item.used &&
          item.position && (
            <div
              key={item.id}
              className={item.className}
              style={{
                position: 'absolute',
                left: item.position.left,
                top: item.position.top,
                width: item.width,
                height: item.height,
                backgroundImage: `url(${item.image})`,
                backgroundSize: 'cover',
                cursor: 'pointer',
              }}
              onClick={() => {
                item.func();
                handleUseItem(item.id);
              }}
              title={item.name}
            />
          )
      )}
    </div>
  );
};

export default GameComponent;
