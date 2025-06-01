import React, { useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';

const TitleScreen = () => {
  const navigate = useNavigate();
  const titleRef = useRef(null);

  useEffect(() => {
    titleRef.current.style.opacity = 1;
    const timer = setTimeout(() => navigate('/cutscene'), 3000);
    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <div 
      ref={titleRef}
      className="title-screen"
      onClick={() => navigate('/cutscene')}
    >
      <h1>EPIC ADVENTURE GAME</h1>
    </div>
  );
};

export default TitleScreen;