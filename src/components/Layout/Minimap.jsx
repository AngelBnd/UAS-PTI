import React, { useEffect, useRef } from 'react';
import { useChar } from "../../utils/charContext";
import mothershipImg from '../../assets/mothership.png';
import planet1Img from '../../assets/planet1.png';
import planet2Img from '../../assets/planet2.png';
import planet3Img from '../../assets/planet3.png';
import planet4Img from '../../assets/planet4.png';
import medkitImg from '../../assets/medkit.png';

const planetImages = {
  Ejwa: planet1Img,
  Kaati: planet2Img,
  Solez: planet3Img,
  Sugma: planet4Img,
  Mothership: mothershipImg
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
        border: '2px solid white',
        position: 'relative',
        backgroundColor: '#222',
        overflow: 'hidden',
        borderRadius: 8
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
            width: 12,
            height: 12,
            left: `${planet.x}%`,
            top: `${planet.y}%`,
            transform: 'translate(-50%, -50%)'
          }}
        />
      ))}

      {/* Medkit Items */}
      {items
        .filter((item) => item.type === 'medkit')
        .map((item) => (
          <img
            key={item.id}
            src={medkitImg}
            alt="medkit"
            style={{
              position: 'absolute',
              width: 10,
              height: 10,
              left: `${item.x}%`,
              top: `${item.y}%`,
              transform: 'translate(-50%, -50%)'
            }}
          />
        ))}

      {/* Player dot hanya jika di MainArea */}
      {currentLocation === 'MainArea' && (
        <div
          ref={playerDotRef}
          style={{
            position: 'absolute',
            width: 6,
            height: 6,
            borderRadius: '50%',
            backgroundColor: 'red',
            transform: 'translate(-50%, -50%)'
          }}
        />
      )}
    </div>
  );
};

export default Minimap;
