import React, { useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';

const Cutscene = () => {
  const navigate = useNavigate();
  const sceneRef = useRef(null);

  useEffect(() => {
    sceneRef.current.style.opacity = 1;
    
    const timer = setTimeout(() => {
      sceneRef.current.style.opacity = 0;
      setTimeout(() => navigate('/character-select'), 1000);
    }, 2500);

    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <div ref={sceneRef} className="cutscene-container">
      <div className="cutscene-text">
        <p>Dalam dunia yang penuh misteri...</p>
        <p>Seorang pahlawan akan bangkit</p>
      </div>
    </div>
  );
};

export default Cutscene;