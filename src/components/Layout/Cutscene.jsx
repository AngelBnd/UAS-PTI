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
        <p>The skies burned, the oceans swallowed cities, and the land turned to dust. </p>
        <p>Humanity's only choice was to leave, to search for a new home among the stars. But something went wrong.</p>
        <p>The ship was hit, systems failed, and now you drift alone among the stars.</p>
        <p>You are humanity's last hope.</p>
      </div>
    </div>
  );
};

export default Cutscene;