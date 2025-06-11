import React, { useEffect, useRef, useState } from 'react';
import { useChar } from "../../utils/charContext";

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

const Minimap = ({ currentLocation }) => {
  const {
    playerRef,
    planetRefs,
    itemRefs
  } = useChar();

  const [positions, setPositions] = useState({
    player: { x: 0, y: 0 },
    planets: [],
    items: []
  });

  useEffect(() => {
    const updatePositions = () => {
      const getScaledPos = (ref) => {
        if (!ref?.current) return null;
        const rect = ref.current.getBoundingClientRect();
        return {
          x: (rect.left / 1200) * 200,
          y: (rect.top / 600) * 100
        };
      };

      const newPlayer = getScaledPos(playerRef);
      const newPlanets = planetRefs
        .map((p) => ({
          id: p.id,
          name: p.name,
          pos: getScaledPos(p.ref)
        }))
        .filter(p => p.pos);

      const newItems = itemRefs
        .map((i) => ({
          id: i.id,
          type: i.type,
          pos: getScaledPos(i.ref)
        }))
        .filter(i => i.pos);

      setPositions({
        player: newPlayer || { x: 0, y: 0 },
        planets: newPlanets,
        items: newItems
      });
    };

    updatePositions();
    const interval = setInterval(updatePositions, 100);
    return () => clearInterval(interval);
  }, [playerRef, planetRefs, itemRefs]);

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
        overflow: 'hidden'
      }}
    >
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
            left: planet.pos.x,
            top: planet.pos.y,
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
              left: item.pos.x,
              top: item.pos.y,
              transform: 'translate(-50%, -50%)'
            }}
          />
        );
      })}

      {/* Player */}
      {currentLocation === 'MainArea' && positions.player && (
        <img
          src={playerDotImg}
          alt="player"
          style={{
            position: 'absolute',
            width: 7,
            height: 7,
            left: positions.player.x,
            top: positions.player.y,
            transform: 'translate(-50%, -50%)'
          }}
        />
      )}
    </div>
  );
};

export default Minimap;
