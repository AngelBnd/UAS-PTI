import React from 'react';
import './Deathbar.css';

export default function DeathBar({ onRestart }) {
  return (
    <div className="game-over">
      <h1 className="title">💀 Game Over 💀</h1>
      <p className="description">Your journey has ended. Better luck next time!</p>
      <button className="button" onClick={onRestart}>
        Restart
      </button>
    </div>
  );
}
