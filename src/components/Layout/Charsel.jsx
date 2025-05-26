import React, { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import char1 from '../../assets/char1.png';
import char2 from '../../assets/char2.png';
import char3 from '../../assets/char3.png';

const CharacterSelection = () => {
  const [selectedChar, setSelectedChar] = useState(1);
  const [playerName, setPlayerName] = useState('');
  const navigate = useNavigate();
  const containerRef = useRef(null);

  const characters = [
    {
      id: 1,
      name: "[REDACTED]",
      stats: "Higher starting stats",
      desc: "All muscle, no momentum.",
      image: char1
    },
    {
      id: 2,
      name: "[REDACTED]",
      stats: "None",
      desc: "Just an ordinary dude.",
      image: char2
    },
    {
      id: 3,
      name: "[REDACTED]", 
      stats: "Agility",
      desc: "Always hungry and tired..",
      image: char3
    }
  ];

  const handleSelection = () => {
    const charData = characters.find(c => c.id === selectedChar);
    localStorage.setItem('gameData', JSON.stringify({
      character: charData,
      playerName
    }));

    containerRef.current.style.opacity = 0;
    setTimeout(() => navigate('/game'), 1500);
  };

  return (
    <div ref={containerRef} className="character-selection">
      <h2>Your Story Begins Here. Who Will You Be?</h2>
      
      <div className="characters-grid">
        {characters.map(char => (
          <div 
            key={char.id}
            className={`character-card ${selectedChar === char.id ? 'selected' : ''}`}
            onClick={() => setSelectedChar(char.id)}
          >
            <img src={char.image} alt={char.name} />
            <h3>{char.name}</h3>
            <p>{char.stats}</p>
            <p className="desc">{char.desc}</p>
          </div>
        ))}
      </div>

      <div className="name-input">
        <input
          type="text"
          value={playerName}
          onChange={(e) => setPlayerName(e.target.value)}
          placeholder="Enter your name"
        />
      </div>

      <button 
        className="start-button"
        onClick={handleSelection}
        disabled={!playerName.trim()}
      >
        Start Journey
      </button>
    </div>
  );
};

export default CharacterSelection;