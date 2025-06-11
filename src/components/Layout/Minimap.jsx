import React, { useEffect, useState } from "react";

import mothershipImg from '../../assets/mothership.png';
import planet1Img from '../../assets/planet1.png';
import planet2Img from '../../assets/planet2.png';
import planet3Img from '../../assets/planet3.png';
import planet4Img from '../../assets/planet4.png';

import medkitImg from '../../assets/medkit.png';
import aircanImg from '../../assets/aircan.png';
import chocoImg from '../../assets/choco.png';
import coffeeImg from '../../assets/coffee.png';
import donutImg from '../../assets/donut.png';

import playerDotImg from '../../assets/playerdot.png';
import minimapBg from '../../assets/playerareabg.png';

const planetImages = {
  Ejwa: planet1Img,
  Kaati: planet2Img,
  Solez: planet3Img,
  Sugma: planet4Img,
  Mothership: mothershipImg
};

const itemImages = {
  medkit: medkitImg,
  aircan: aircanImg,
  choco: chocoImg,
  coffee: coffeeImg,
  donut: donutImg
};

const Minimap = ({ cameraPos, playerRef, planetRefs, itemRefs, itemsOnMap }) => {
  const [positions, setPositions] = useState({
    player: null,
    planets: [],
    items: []
  });

  useEffect(() => {
    const updatePositions = () => {
      const getScaledPos = (ref) => {
        if (!ref) return null;
        const rect = ref.getBoundingClientRect();
        return {
          x: (rect.left / window.innerWidth) * 200,
          y: (rect.top / window.innerHeight) * 100
        };
      };

      const newPlayer = getScaledPos(playerRef.current);

      const newPlanets = planetRefs.current.map((ref, i) => {
        if (!ref) return null;
        return {
          id: i,
          name: ref.getAttribute("data-name"),
          pos: getScaledPos(ref)
        };
      }).filter(p => p?.pos);

      const newItems = itemRefs.current.map((ref, i) => {
        const item = itemsOnMap[i];
        if (!ref || !item) return null;
        return {
          id: item.id,
          type: item.type,
          pos: getScaledPos(ref)
        };
      }).filter(i => i?.pos);

      setPositions({ player: newPlayer, planets: newPlanets, items: newItems });
    };

    updatePositions();
    const interval = setInterval(updatePositions, 100);
    return () => clearInterval(interval);
  }, [playerRef, planetRefs, itemRefs, itemsOnMap]);

  return (
    <div
      style={{
        width: 200,
        height: 100,
        position: 'relative',
        border: '2px solid white',
        backgroundImage: `url(${minimapBg})`,
        backgroundSize: 'cover',
        borderRadius: 8,
        overflow: 'hidden',
      }}
    >
      {/* Player Dot */}
      {positions.player && (
        <img
          src={playerDotImg}
          alt="player"
          style={{
            position: 'absolute',
            width: 7,
            height: 7,
            left: `${positions.player.x}px`,
            top: `${positions.player.y}px`,
            transform: 'translate(-50%, -50%)'
          }}
        />
      )}

      {/* Planets */}
      {positions.planets.map((planet) => (
        <img
          key={planet.id}
          src={planetImages[planet.name]}
          alt={planet.name}
          style={{
            position: 'absolute',
            width: 14,
            height: 14,
            left: `${planet.pos.x}px`,
            top: `${planet.pos.y}px`,
            transform: 'translate(-50%, -50%)'
          }}
        />
      ))}

      {/* Items */}
      {positions.items.map((item) => {
        const img = itemImages[item.type];
        if (!img) return null;

        return (
          <img
            key={item.id}
            src={img}
            alt={item.type}
            style={{
              position: 'absolute',
              width: 10,
              height: 10,
              left: `${item.pos.x}px`,
              top: `${item.pos.y}px`,
              transform: 'translate(-50%, -50%)'
            }}
          />
        );
      })}
    </div>
  );
};

export default Minimap;
