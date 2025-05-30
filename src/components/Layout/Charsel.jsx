import React, { useEffect, useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { useChar } from '../../utils/charContext';
import char1 from '../../assets/char1.png';
import char2 from '../../assets/char2.png';
import char3 from '../../assets/char3.png';
import leftBtn from '../../assets/monitor-left.png';
import leftHover from '../../assets/left-hover.png';
import rightBtn from '../../assets/monitor-right.png';
import rightHover from '../../assets/right-hover.png';
import btnSound from '../../assets/btn-sound.mp3';
import './Charsel.css';

const CharacterSelection = () => {
  const {selectedChar, updateSelectedChar} = useChar(1);
  const {playerName, setPlayerName} = useChar('');
  const playBtn = new Audio(btnSound);
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

  var currChar = characters.find(char => char.id === selectedChar);

  useEffect(() => {

    const container = containerRef.current;
    if (container) {
      container.style.opacity = 0;

      setTimeout(() => {
        container.style.transition = 'opacity 1.5s steps(18, jump-end)';
        container.style.opacity = 1;
      }, 1000);
    }
  }, []);

  useEffect(() => {
    console.log("Character now is ", selectedChar);
  }, [selectedChar]);

  const handleCycle = (direction) => {
    playBtn.play();
    updateSelectedChar ((prev) => {
      if (direction === 'left') {
        return prev === 1 ? characters.length : prev - 1;
      } else if (direction === 'right') {
        return prev === characters.length ? 1 : prev + 1;
      }
      return prev;
    });
  };

  const handleSelection = () => {
    if(!playerName.trim()) {
      setPlayerName('[REDACTED]');
      return;
    }

    console.log("Erm selected player namae is ", playerName);
    console.log("Selected character is ", selectedChar);
    navigate('/game');
  }

  return (
    <div id='blackScreen'>
      <div ref={containerRef} className="charsel container-fluid d-flex flex-column align-items-center my-auto">
        <div className='monitor d-flex flex-column my-auto mx-auto justify-content-center align-items-center py-5 my-4 w-75'>

          <div className='charsel-text container mx-auto my-2 py-2'>
            Your Story Begins Here. Who Will You Be?
          </div>
            

          <div className='main-info row mx-auto my-0 py-2 justify-content-around align-items-center h-75 w-100'>

            <div className='div-btn col text-center'>
              <button className='btn' id='btn1'><img className='btn-img w-100' src={leftBtn} alt="" onClick={() => handleCycle('left')}
              onMouseOver={(e) => e.target.src = leftHover} onMouseOut={(e) => e.target.src = leftBtn}/></button>
            </div>

            <div className='char-img col-3 text-center'>
              <img id='character' className='w-75' src={currChar.image} alt={currChar.name} />
            </div>

            <div className="char-info col-5 text-start">
              <p>Name : {currChar.name}</p>
              <p>Skills : {currChar.stats}</p>
              <p>Description : {currChar.desc}</p>
            </div>

            <div className='div-btn col text-center'>
              <button className='btn' id='btn2'><img className='btn-img w-100' src={rightBtn} alt="" onClick={() => handleCycle('right')}
              onMouseOver={(e) => e.target.src = rightHover} onMouseOut={(e) => e.target.src = rightBtn}/></button>
            </div>

          </div>


          <div>
            <input className='name-input' type="text" value={playerName} onChange={(e) => setPlayerName(e.target.value)} placeholder="IDENTIFICATION REQUIRED"/>
          </div>

          <div>
            <button id="select-button" onClick={handleSelection} >Select</button>
          </div>
        
        </div>
      </div>
    </div>
  );
};

export default CharacterSelection;