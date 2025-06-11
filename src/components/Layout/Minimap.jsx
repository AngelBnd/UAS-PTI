import React, { useEffect, useRef } from 'react';
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
  const { playerPositionRef, planets, items } = useChar();
  const playerDotRef = useRef(null);

  useEffect(() => {
    const updateMinimap = () => {
      if (playerDotRef.current && playerPositionRef.current) {
        playerDotRef.current.style.left = `${(playerPositionRef.current.x / 1200) * 100}%`;
        playerDotRef.current.style.top = `${(playerPositionRef.current.y / 600) * 100}%`;
      }
    };
    updateMinimap();
    const interval = setInterval(updateMinimap, 100);
    return () => clearInterval(interval);
  }, [playerPositionRef]);

  return (
    <div
      style={{
        width: 200,
        height: 100,
        position: 'relative',
        overflow: 'hidden',
        border: '2px solid white',
        borderRadius: 8,
        backgroundImage: `url(${minimapBg})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center'
      }}
    >
      {/* Planets */}
      {planets.map((planet) => (
        <img
          key={planet.id}
          src={planetImages[planet.name]}
          alt={planet.name}
          style={{
            position: 'absolute',
            width: 14,
            height: 14,
            left: `${planet.x}%`,
            top: `${planet.y}%`,
            transform: 'translate(-50%, -50%)'
          }}
        />
      ))}

      {/* Items */}
      {items.map((item) => {
        const imgSrc = itemImages[item.type];
        if (!imgSrc) return null;
        return (
          <img
            key={item.id}
            src={imgSrc}
            alt={item.type}
            style={{
              position: 'absolute',
              width: 12,
              height: 12,
              left: `${item.x}%`,
              top: `${item.y}%`,
              transform: 'translate(-50%, -50%)'
            }}
          />
        );
      })}

      {/* Player dot */}
      {currentLocation === 'MainArea' && (
        <img
          ref={playerDotRef}
          src={playerDotImg}
          alt="player"
          style={{
            position: 'absolute',
            width: 19,
            height: 19,
            transform: 'translate(-50%, -50%)'
          }}
        />
      )}
    </div>
  );
};

export default Minimap;
