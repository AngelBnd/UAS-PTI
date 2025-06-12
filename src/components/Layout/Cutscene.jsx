import React from 'react';
import { useNavigate } from 'react-router-dom';
import cutscene from '../../assets/cutsceneNew.mp4';
import './Cutscene.css';

const Cutscene = () => {
  const navigate = useNavigate();


  return (
    <div className="cutscene-container">
      <button className='skip' onClick={()=>navigate('/character-select')}>skip</button>
      <video
        src={cutscene}
        className="cutscene-video"
        autoPlay
        playsInline
        onEnded={() => navigate('/character-select')}
      />
    </div>
  );
};

export default Cutscene;