import React from 'react';
import { useChar } from '../../utils/charContext';
import styled from 'styled-components';

import playerDot from '../../assets/playerdot.png';
import planet1 from '../../assets/planet1.png';
import planet2 from '../../assets/planet2.png';
import planet3 from '../../assets/planet3.png';
import planet4 from '../../assets/planet4.png';
import mothership from '../../assets/mothership.png';
import colaImg from '../../assets/cola.png';
import medkitImg from '../../assets/medkit.png';

const MinimapContainer = styled.div`
  position: fixed;
  bottom: 20px;
  right: 20px;
  width: 250px;
  height: 250px;
  background-color: rgba(0, 0, 0, 0.7);
  border: 3px solid #ffdba2;
  border-radius: 10px;
  padding: 10px;
  z-index: 1000;
  box-shadow: 0 0 10px rgba(255, 219, 162, 0.5);
`;

const MapArea = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
  background-color: rgba(18, 18, 18, 0.3);
  background-size: cover;
  border-radius: 5px;
`;

const PlayerMarker = styled.div`
  position: absolute;
  width: 0.5cm;
  height: 0.5cm;
  background-image: url(${playerDot});
  background-size: contain;
  background-repeat: no-repeat;
  transform: translate(-50%, -50%);
  z-index: 10;
`;

const PlanetMarker = styled.div`
  position: absolute;
  width: 0.8cm;
  height: 0.8cm;
  background-size: contain;
  background-repeat: no-repeat;
  transform: translate(-50%, -50%);
  z-index: 5;
`;

const ItemMarker = styled.div`
  position: absolute;
  width: 0.5cm;
  height: 0.5cm;
  background-size: contain;
  background-repeat: no-repeat;
  transform: translate(-50%, -50%);
  z-index: 6;
`;

const Minimap = ({ currentLocation }) => {
  const { playerPosition, planets, items } = useChar();

  const planetImages = {
    'Ejwa': planet1,
    'Kaati': planet2,
    'Solez': planet3,
    'Sugma': planet4,
    'Mothership': mothership
  };

  const itemImages = {
    'cola': colaImg,
    'medkit': medkitImg
  };

  return (
    <MinimapContainer>
      <h3 style={{
        fontSize: '12px',
        color: '#ffdba2',
        margin: '0 0 8px 0',
        textAlign: 'center',
        textShadow: '0 0 5px #ffdba2'
      }}>
        SPACE MINIMAP - {currentLocation.toUpperCase()}
      </h3>

      <MapArea>
        <PlayerMarker style={{
          left: `${playerPosition.x}%`,
          top: `${playerPosition.y}%`
        }} />

        {planets.map(planet => (
          <PlanetMarker
            key={`planet-${planet.id}`}
            style={{
              left: `${planet.x}%`,
              top: `${planet.y}%`,
              backgroundImage: `url(${planetImages[planet.name] || planet1})`
            }}
          />
        ))}

        {items.map(item => (
          <ItemMarker
            key={`item-${item.id}`}
            style={{
              left: `${item.x}%`,
              top: `${item.y}%`,
              backgroundImage: `url(${itemImages[item.type] || colaImg})`
            }}
          />
        ))}
      </MapArea>

      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        fontSize: '8px',
        color: '#ffdba2',
        marginTop: '8px',
        padding: '0 5px'
      }}>
        <div>
          <img src={playerDot} alt="Player" style={{ width: '10px', marginRight: '5px' }} />
          <span>Player</span>
        </div>
        <div>
          <img src={mothership} alt="Mothership" style={{ width: '10px', marginRight: '5px' }} />
          <span>Mothership</span>
        </div>
      </div>
    </MinimapContainer>
  );
};

export default Minimap;
