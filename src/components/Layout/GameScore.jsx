import React from 'react';

const GameOverScreen = ({ score, onRestart }) => (
  <div className="game-over-screen">
    <h2>Game Over</h2>
    <p>Your Score: {score}</p>
    <button onClick={onRestart}>Play Again</button>
  </div>
);

export default GameOverScreen;
