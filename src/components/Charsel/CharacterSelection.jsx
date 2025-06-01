import React, { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';

const CharacterSelection = () => {
  const [selectedChar, setSelectedChar] = useState(1);
  const [playerName, setPlayerName] = useState('');
  const navigate = useNavigate();
  const containerRef = useRef(null);

  const characters = [
    {
      id: 1,
      name: "Knight",
      stats: "STR: 10 | AGI: 5 | INT: 3",
      desc: "Berkat pelatihan keras, memiliki pertahanan yang kuat.",
      image: "/assets/knight.png"
    },
    {
      id: 2,
      name: "Mage",
      stats: "STR: 3 | AGI: 4 | INT: 10",
      desc: "Menguasai elemen sihir yang mematikan.",
      image: "/assets/mage.png"
    },
    {
      id: 3,
      name: "Rogue", 
      stats: "STR: 5 | AGI: 10 | INT: 4",
      desc: "Gerakan cepat dan serangan mematikan.",
      image: "/assets/rogue.png"
    }
  ];

  const handleSelection = () => {
    // Simpan data ke localStorage
    const charData = characters.find(c => c.id === selectedChar);
    localStorage.setItem('gameData', JSON.stringify({
      character: charData,
      playerName
    }));

    // Transition ke main game
    containerRef.current.style.opacity = 0;
    setTimeout(() => navigate('/game'), 1500);
  };

  return (
    <div ref={containerRef} className="character-selection">
      <h2>Pilih Karaktermu</h2>
      
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
          placeholder="Masukkan nama kamu"
        />
      </div>

      <button 
        className="start-button"
        onClick={handleSelection}
        disabled={!playerName.trim()}
      >
        Mulai Petualangan
      </button>
    </div>
  );
};

export default CharacterSelection;