import React from 'react';
import styled from 'styled-components';
import { useChar } from '../../utils/charContext';
import { useEffect } from 'react';
import planet1Img from '../../assets/planet1.png';
import planet2Img from '../../assets/planet2.png';
import planet3Img from '../../assets/planet3.png';
import planet4Img from '../../assets/planet4.png';
import mothershipImg from '../../assets/mothership.png';

const MinimapContainer = styled.div`
    position: fixed;
    bottom: 20px;
    right: 20px;
    width: 200px;
    height: 200px;
    background-color: rgba(0, 0, 0, 0.7);
    border: 2px solid #ffdba2;
    border-radius: 8px;
    padding: 10px;
    z-index: 1000;
    color: #ffdba2;
    font-size: 10px;
`;

const MapArea = styled.div`
    position: relative;
    width: 100%;
    height: 100%;
    background-color: rgba(18, 18, 18, 0.5);
`;

const PlayerDot = styled.div`
    position: absolute;
    width: 12px;
    height: 12px;
    background-color: #ff0000;
    border-radius: 50%;
    transform: translate(-50%, -50%);
    z-index: 3;
    box-shadow: 0 0 5px 2px #ff0000;
`;

const PlanetIcon = styled.img`
    position: absolute;
    width: 14px;
    height: 14px;
    transform: translate(-50%, -50%);
    cursor: pointer;
    z-index: 2;
`;

const ItemDot = styled.div`
    position: absolute;
    width: 8px;
    height: 8px;
    background-color: #f1c40f;
    border-radius: 50%;
    transform: translate(-50%, -50%);
    z-index: 1;
`;

const imageMap = {
    'Planet A': planet1Img,
    'Planet B': planet2Img,
    'Kaati': planet3Img,
    'Sugma': planet4Img,
    'Mothership': mothershipImg
};

const Minimap = () => {
    const {
        playerPosition,
        planets,
        items,
        setCurrentLocation,
        currentLocation
    } = useChar();

    const handleTeleport = (location) => {
        setCurrentLocation(location);
    };

    return (
        <MinimapContainer>
            <div style={{ marginBottom: '4px' }}>
                MINIMAP - {currentLocation}
            </div>
            <MapArea>
                <PlayerDot
                    style={{
                        left: `${playerPosition.x}%`,
                        top: `${playerPosition.y}%`
                    }}
                />

                {planets.map((planet) => (
                    <PlanetIcon
                        key={`planet-${planet.id}`}
                        src={imageMap[planet.name]}
                        style={{
                            left: `${planet.x}%`,
                            top: `${planet.y}%`
                        }}
                        title={`Go to ${planet.name}`}
                        onClick={() => handleTeleport(planet.location)}
                    />
                ))}

                {items.map((item) => (
                    <ItemDot
                        key={`item-${item.id}`}
                        style={{
                            left: `${item.x}%`,
                            top: `${item.y}%`
                        }}
                    />
                ))}
            </MapArea>
            <div style={{ fontSize: '8px', marginTop: '5px' }}>
                <span style={{ color: '#ff0000' }}>■</span> Player •
                <span style={{ color: '#3498db' }}> 🪐</span> Planet •
                <span style={{ color: '#f1c40f' }}>■</span> Item
            </div>
        </MinimapContainer>
    );
};

export default Minimap;