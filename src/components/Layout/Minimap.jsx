import React from 'react';
import { useChar } from '../../utils/charContext';
import styled from 'styled-components';

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
    z-index: 100;
`;

const MapArea = styled.div`
    position: relative;
    width: 100%;
    height: 100%;
    background-color: rgba(18, 18, 18, 0.5);
`;

const PlayerDot = styled.div`
    position: absolute;
    width: 10px;
    height: 10px;
    background-color: #ff0000;
    border-radius: 50%;
    transform: translate(-50%, -50%);
`;

const PlanetDot = styled.div`
    position: absolute;
    width: 12px;
    height: 12px;
    background-color: #3498db;
    border-radius: 50%;
    transform: translate(-50%, -50%);
`;

const ItemDot = styled.div`
    position: absolute;
    width: 8px;
    height: 8px;
    background-color: #f1c40f;
    border-radius: 50%;
    transform: translate(-50%, -50%);
`;

const Minimap = () => {
    const { playerPosition, planets, items } = useChar();

    return (
        <MinimapContainer>
            <h3 style={{ fontSize: '10px', color: '#ffdba2', margin: '0 0 5px 0' }}>MINIMAP</h3>
            <MapArea>
                {/* Player */}
                <PlayerDot style={{
                    left: `${playerPosition.x}%`,
                    top: `${playerPosition.y}%`
                }} />

                {/* Planets */}
                {planets.map(planet => (
                    <PlanetDot key={`planet-${planet.id}`} style={{
                        left: `${planet.x}%`,
                        top: `${planet.y}%`
                    }} />
                ))}

                {/* Items */}
                {items.map(item => (
                    <ItemDot key={`item-${item.id}`} style={{
                        left: `${item.x}%`,
                        top: `${item.y}%`
                    }} />
                ))}
            </MapArea>
            <div style={{ fontSize: '8px', color: '#ffdba2', marginTop: '5px' }}>
                <span style={{ color: '#ff0000' }}>■</span> Player • 
                <span style={{ color: '#3498db' }}>■</span> Planet • 
                <span style={{ color: '#f1c40f' }}>■</span> Item
            </div>
        </MinimapContainer>
    );
};

export default Minimap;
