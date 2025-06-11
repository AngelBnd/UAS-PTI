import React, { useEffect, useRef } from 'react';
import { useChar } from "../../utils/charContext";

// Import assets
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

// Image mappings
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
  const { playerPosition, planets, items } = useChar();
  const playerDotRef = useRef(null);

  // Update player dot position
  useEffect(() => {
    if (playerDotRef.current) {
      playerDotRef.current.style.left = `${playerPosition.x}%`;
      playerDotRef.current.style.top = `${playerPosition.y}%`;
    }
  }, [playerPosition]);

  return (
    <div
      className="minimap-container"
      style={{
        width: '200px',
        height: '150px',
        position: 'absolute',
        bottom: '20px',
        right: '20px',
        overflow: 'hidden',
        border: '2px solid #ffdba2',
        borderRadius: '8px',
        backgroundImage: `url(${minimapBg})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        zIndex: 1000,
        boxShadow: '0 0 10px rgba(0,0,0,0.5)'
      }}
    >
      {/* Render planets */}
      {planets.map((planet) => (
        <img
          key={`planet-${planet.id}`}
          src={planetImages[planet.name]}
          alt={planet.name}
          style={{
            position: 'absolute',
            width: '14px',
            height: '14px',
            left: `${planet.x}%`,
            top: `${planet.y}%`,
            transform: 'translate(-50%, -50%)',
            zIndex: 2
          }}
        />
      ))}

      {/* Render items */}
      {items.map((item) => {
        const imgSrc = itemImages[item.type];
        if (!imgSrc) return null;
        
        return (
          <img
            key={`item-${item.id}`}
            src={imgSrc}
            alt={item.type}
            style={{
              position: 'absolute',
              width: '12px',
              height: '12px',
              left: `${item.x}%`,
              top: `${item.y}%`,
              transform: 'translate(-50%, -50%)',
              zIndex: 1
            }}
          />
        );
      })}

      {/* Player indicator */}
      <img
        ref={playerDotRef}
        src={playerDotImg}
        alt="player position"
        style={{
          position: 'absolute',
          width: '16px',
          height: '16px',
          transform: 'translate(-50%, -50%)',
          zIndex: 3,
          transition: 'left 0.3s ease-out, top 0.3s ease-out',
          filter: 'drop-shadow(0 0 2px rgba(255, 255, 255, 0.7))'
        }}
      />
    </div>
  );
};

export default Minimap;