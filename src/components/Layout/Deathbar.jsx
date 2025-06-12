import React from 'react';
import './Deathbar.css';
import { useNavigate } from 'react-router-dom';

export default function DeathBar({absoluteResources, resourcesSpent, locationsVisited, activitiesDone, itemsUsed, itemsCollected }) {

  const navigate = useNavigate();

  const handleRetry = () => {
    navigate('/'); 
  };

  let totalScore = (absoluteResources*5) + (activitiesDone*10) + (itemsCollected*10) + (itemsUsed*10) + (locationsVisited.length*100); 
  
  return (
    <div className="gameOver">
      <h1 className="title">Game Over</h1>
      <div className="score">
        Total resources colleced = {absoluteResources}
        <br/> 
        Total resources spent = {Math.abs(resourcesSpent)}
        <br/>
        Total activities done = {activitiesDone}
        <br/>
        Total items collected = {itemsCollected}
        <br/>
        Total items used = {itemsUsed}
        <br/> <br/>
        You've visited 
        <br/>
        {locationsVisited.map((location, index)=>(
          <span key ={index}>{location} </span>
        ))}
        <br/><br/>
        Your total score : {totalScore} 
        
      </div>
      <p className="description">Your journey has ended. Better luck next time!</p>
      <button className="button" onClick={handleRetry}>
        Try again
      </button>
    </div>
  );
}
